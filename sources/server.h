#include <string>
#include <atomic>
#include <thread>

#include <boost/filesystem/path.hpp>
#include <boost/exception/exception.hpp>

namespace http_server {

class HttpServer
{
public:
    HttpServer(const std::string& addr, const unsigned short port, const boost::filesystem::path& server_path );
    HttpServer(HttpServer&&)=delete;
	HttpServer(const HttpServer&)=delete;
    HttpServer& operator=(HttpServer&&)=delete;
    HttpServer operator=(const HttpServer&)=delete;
    ~HttpServer();

    void StartListen(const int max_listen = 5);
    void StopListen() { m_listen_flag.store(0); }
    bool IsListen() const { return m_listen_flag.load(); }
    void JoinStop();

    void InitServer();
    void CloseServer();
    bool IsInit() const {return m_sd != -1; }

    std::string GetAddr() const { return m_addr; }
    int GetPort() const { return m_port; }
    void SetPath(const boost::filesystem::path& path) { m_path = path; }
    boost::filesystem::path GetPath() const { return m_path; }

private:
    void StartListen_(const int max_listen);
    static void HandleRequest(int ssd, const boost::filesystem::path);

	std::string m_addr;
    unsigned short m_port;
    boost::filesystem::path m_path;
    int m_sd = -1;
    std::atomic<bool> m_listen_flag{false};
    std::thread m_listen_thread;
};

}
