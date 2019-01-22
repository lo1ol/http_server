#include <iostream>
#include <string>
#include <atomic>
#include <thread>
#include <exception>

#include <boost/filesystem/path.hpp>
#include <boost/filesystem.hpp>
#include "boost/algorithm/string/replace.hpp"

#include <sys/stat.h>
#include <fcntl.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "server.h"

#define BUFSIZE 1024

namespace http_server {

const std::string OK_RESPONSE=
R"""(HTTP/1.1 200 OK
Server: Petya)""";

const std::string BAD_RESPONSE=
R"""(HTTP/1.1 403 Not Found
Server: Petya
Content-Type: text/html
Content-Length: 73

<!DOCTYPE html>
<html>
<body>
<h1>404 File Not Found</h1>
</body>
</html>)""";

namespace  {


std::string GetMimeType(const boost::filesystem::path& path)
{
    FILE* fp = popen(("file --mime-type '" + path.string() + "' | rev | cut -d ' ' -f 1 | rev").c_str(), "r");
    if (fp == NULL) {
        perror("Failed to run command\n" );
        return "";
    }

    char* c_mime=NULL;
    size_t len=0;

    getline(&c_mime, &len, fp);
    fclose(fp);
    std::string mime(c_mime);
    free(c_mime);
    return mime;
}

bool SendText(const int ssd, const std::string& text)
{
    const char* c_res = text.c_str();
    size_t i =0;
    while (i < text.size()) {
        send(ssd, c_res + i, std::min(BUFSIZE, int(text.size() - i)), 0);
        i += BUFSIZE;
    }
}

bool SendFile(const int ssd, const std::string& body, const std::string& mimetype)
{
    SendText(ssd, OK_RESPONSE +
             "\nContent-Type: " + mimetype +
             "\nContent-Length: " + std::to_string(body.length()) +
             "\nConnection: close \n\n" + body);
}

bool SendBad(const int ssd)
{
    SendText(ssd, BAD_RESPONSE);
}

boost::filesystem::path GetFile(const std::string& line)
{
    std::string::size_type start = line.find(" ");
    if (start == std::string::npos) {
        return "";
    }
    start += 2;
    std::string::size_type end = line.find(" ", start);
    return boost::replace_all_copy<std::string>(line.substr(start, end - start), "%20", " ");
}

}

void HttpServer::HandleRequest(const int ssd, const boost::filesystem::path data_path)
{
    FILE* stream = fdopen(ssd, "r");
    char* c_line = NULL;
    size_t len = 0;
    if (getline(&c_line, &len, stream) == -1) {
        close(ssd);
        return;
    }

    std::cerr << "Get Request: " << c_line << std::endl;
    std::string line(c_line);
    free(c_line);

    boost::filesystem::path filename = data_path / GetFile(line);

    if( filename == data_path) {
        filename /= "main.html";
    }

    if (! boost::filesystem::is_regular_file(filename)) {
        std::cerr << "Is not Regular file: " << filename.c_str() << std::endl;
        SendBad(ssd);
        close(ssd);
        return;
    }

    std::string body;

    std::ifstream file(filename.c_str());
    while(std::getline(file, line)) {
        body += line;
        body += "\n";
    }
    if (! body.empty()){
        body.pop_back();
    }

    std::string mime_type = GetMimeType(filename);
    if (mime_type.empty()) {
        mime_type = "application/octet-stream";
    }

    SendFile(ssd, body, mime_type);
    close(ssd);
}

HttpServer::HttpServer(const std::string& addr, const unsigned short port, const boost::filesystem::path& server_path)
    : m_addr(addr)
    , m_port(port)
    , m_path(server_path)
{
    InitServer();
}

HttpServer::~HttpServer()
{
    StopListen();
    JoinStop();
    CloseServer();
}

void HttpServer::StartListen(const int max_listen)
{
    m_listen_flag.store(1);
    m_listen_thread = std::thread([&](){ StartListen_(max_listen); });
}

void HttpServer::JoinStop()
{
    if (m_listen_thread.joinable()) {
        m_listen_thread.join();
    }
}

void HttpServer::StartListen_(const int max_listen)
{
    m_listen_flag.store(1);
    if (! IsInit()) {
        m_listen_flag.store(0);
        return;
    }

    if (listen(m_sd, max_listen) == -1) {
        m_listen_flag.store(0);
        return;
    }

    while (m_listen_flag.load()) {
        timeval timeout;
        timeout.tv_sec  =1;
        timeout.tv_usec =0;
        int ssd = accept(m_sd, NULL, NULL);
        if (ssd == -1) {
            continue;
        }

        std::thread(HandleRequest, ssd, m_path).detach();
    }
    m_listen_flag = 0;
}

void HttpServer::InitServer()
{
    if (IsInit()) {
        return;
    }

    StopListen();
    JoinStop();

    int sd = socket(AF_INET, SOCK_STREAM, 0);
    if (sd == -1) {
        throw std::runtime_error("Can't create socket!");
    }

    {
        sockaddr_in addr;
        addr.sin_family = AF_INET;
        addr.sin_port = htons(m_port);
        for(int i=0; i != 8; ++i) {
            addr.sin_zero[i] = 0;
        }

        inet_aton(m_addr.c_str(), &addr.sin_addr);
        if (bind(sd, reinterpret_cast<sockaddr*> (&addr), sizeof (addr)) == -1) {
            close(sd);
            sd = -1;
            throw std::runtime_error("Can't create socket!");
        }
    }

    m_sd = sd;
}

void HttpServer::CloseServer()
{
    if (! IsInit()) {
        return;
    }
    StopListen();
    JoinStop();
    close(m_sd);
    m_sd = -1;
}

}
