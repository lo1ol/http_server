# Запуск
для запуска сервера ему необходимо передать через коммандную строку путь до папки в которой лежат файлы для работы с сервером. 

при желании можно передать собственный адрес и порт для привязки его к сокету (по умолчанию 127.0.0.1:8081), также используя аргументы командной строки

пример запуска bin/http_server -d example -a 127.0.0.1 -p 8081.

Чтобы оставновить работу сервера -- нажмите stop. После этого дождитес пока не обработается еще один запрос идущий к серверу (можете отправить его обратившись к серверу через браузер)

# Работа с сервером через браузер

Для того, чтобы обратится к серверу через браузер необходимо открыть его и в коммандной строке вбить address:port/file_inside_dir

Пример localhost:8081/main.html

Если file_inside_dir -- пустая строка, то по умолчанию будет пытаться отправится main.html 

# Сбора 
Для сборки необходимо иметь boost. Сборку можно производить в дирреткории программы

Пример
cd path/to/http_server
cmake
make

# Примечание
Сам функцианал работы с сервером же  представлен в виде написанной билиотеки, которую можно будет в дальнейшем использовать в других проектах
