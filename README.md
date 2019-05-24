# Backend Personal

#### Boilerplate repository for Lectrum Backend Personal.

#### Перед запуском проекта:
1. Создать в корне проекта (на одном уровне с package.json) файл с именем `.env`
2. Добавить в файл следующий код

**Обратите внимание!**
1. DB_NAME → имя базы данных
2. PASSWORD → пароль используемый для шифрования cookie
3. DB_URL → DNS имя или IP для подключения к базе данных

```
# Debug
DEBUG='server:*,router:*,storage,db,helper:*'

# Server
PORT=3000

# Cookie
PASSWORD=''

# DB
DB_NAME=''
DB_URL=''
```