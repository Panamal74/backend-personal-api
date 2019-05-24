# Backend Personal

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

**Данные для тестирования**
```
Modell staff: 
{
  "name": "John Doe",
  "email": "jdoe@email.com",
  "phone": "(097) 555 6677",
  "role": "CEO",
  "password": "your_strong_password_1"
}

Modell customers: 
{
  "name": "Chuck Norris",
  "email": "cnorris@email.com",
  "phone": "(097) 555 6677",
  "city": "Ryan, Oklahoma",
  "country": "USA",
  "password": "your_strong_password_2"
}

{
  "name": "Bruce Lee",
  "email": "blee@email.com",
  "phone": "(097) 555 6677",
  "city": "San Francisco",
  "country": "USA",
  "password": "your_strong_password_3"
}

customers/put:
{
  "name": {
    "first": "Bruce",
    "last": "Lee"
  },
  "emails": [
    {
      "email": "blee@email.com",
      "action": "remove"
    },
    {
      "email": "lee@email.com",
      "action": "add"
    },
    {
      "email": "lee_123@email.com",
      "action": "add"
    }
  ],
  "phones": [
    {
      "phone": "(097) 555 6677",
      "action": "remove"
    },
    {
      "phone": "(097) 111 2233",
      "action": "add"
    }
  ],
  "city": "Kyiv",
  "country": "Ukraine"
}

products/post:
{
  "title": "iPhone XS Max",
  "description": "The latest version",
  "price": 1000,
  "discount": 5,
  "total": 10
}

{
  "title": "iPhone 7",
  "description": "The old version",
  "price": 500,
  "discount": 15,
  "total": 20
}
```