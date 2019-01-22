cmake_minimum_required (VERSION 3.0)
project (http_server)

find_package(Boost 1.66.0 COMPONENTS filesystem program_options)
if (Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
else()
    message(FATAL_ERROR "lua library not found")
endif()

set (SOURCES main.cpp)
set (SERVER_LIB http_server_lib)
set (SERVER_LIB_HEADERS server.h)
set (SERVER_LIB_SOURCES server.cpp)

add_library (${SERVER_LIB} ${SERVER_LIB_SOURCES} ${SERVER_LIB_HEADERS} )
target_link_libraries(${SERVER_LIB} pthread)

add_executable (${PROJECT_NAME} ${SOURCES})
target_link_libraries (${PROJECT_NAME} ${SERVER_LIB} ${Boost_LIBRARIES})
