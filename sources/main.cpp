#include <iostream>
#include <unistd.h>
#include <cstring>
#include <csignal>

#include <boost/program_options.hpp>
#include <boost/filesystem/path.hpp>
#include <boost/filesystem.hpp>

#include "server.h"

namespace po = boost::program_options;
namespace fs = boost::filesystem;

int main(int argc, char* argv[])
{
    fs::path data_path;
    po::options_description desc("Allowed options");

    desc.add_options()
            ("help,h", "produce help message")
            ("path,p", po::value<fs::path>(&data_path), "path to data for server");


    po::variables_map vm;
    try {
        po::store(po::parse_command_line(argc, argv, desc), vm);
        po::notify(vm);
    } catch (std::exception) {
        std::cout << desc;
        return EXIT_FAILURE;
    }

    if (vm.count("help")) {
        std::cout << desc << std::endl;
        return EXIT_SUCCESS;
    }

    if (! vm.count("path") || ! fs::is_directory(data_path)) {
        std::cerr << "Path must be specified" << std::endl;
        std::cout << desc << std::endl;
        return EXIT_FAILURE;
    }

    try {
        http_server::HttpServer server("127.0.0.1", 8082, data_path);

        std::cout << "Start listen" << std::endl;
        server.StartListen();

        std::string stop;
        while(stop != "stop"){
            std::cin >> stop;
        }

        std::cout << "Stop listen" << std::endl;
        server.CloseServer();

    } catch (const std::runtime_error& ex) {
        std::cerr << "Error when try start server: " << ex.what() << std::endl;
    }
}
