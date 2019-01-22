cmake_minimum_required (VERSION 3.0)
project (http_server)

set(
    CMAKE_RUNTIME_OUTPUT_DIRECTORY
    ${CMAKE_HOME_DIRECTORY}/bin
)

set(
    CMAKE_ARCHIVE_OUTPUT_DIRECTORY
    ${CMAKE_HOME_DIRECTORY}/lib
)

add_subdirectory(sources)
