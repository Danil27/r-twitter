# R-Twitter backend

## Development

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/download) 
- [NestJS](https://nestjs.com)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [PassportJs](https://www.passportjs.org/)
- [Swagger](https://swagger.io/)

### Setup
1. Copy `.env.example` to `.env` and replace with your credentials
1. Run `npm ci`
1. Run `docker-compose up -d`
1. Run `npm run migration:run`
1. Run `npm run start:dev`

##
1. Скопировать файл `.env.example` в `.env` добавить настройки для подключения к базе и другие параметры.
1. Установить npm зависимости командой `npm ci` не `npm i` т.к. версии зависимиостей могут поменятся.
1. Запустить docker командой `docker-compose up -d` (запустятся 2 контейнера redis и postges).
1. Запустить миграции командой `npm run migration:run`, создаются таблицы в бд для работы приложения.
1. Запустить приложение командой `npm run start:dev`
### Документация `swagger` находится по url: `http://localhost:3000/api`

## Тесты
Тесты запускаются командой `npm run test`
## Api doc
- [Swagger doc](http://localhost:3000/api#/)

## Doc
### Авторизация
#### Модуль: `src/auth `
Регистрация, авторизация, смена пароля, выдача jwt токена. Пароли хешируются через библиотеку `bcrypt`. jwt токен подписывается JWT_PRIVATE_KEY,
который устанавливется в .env. Модуль авторизации работает с пользователем через модуль `src/users`.

### Пользователи
#### Модуль: `src/users` 
Содержит CRUD операции для управления профилем пользователя. Состоит из 2х таблиц `accounts` и `users`. Таблица accounts отчечает за хранения данных
для авторизации: почта, логин, хеш пароля и т.д. ссылается на таблицу users в которой хранятся пользовательские данные: firstname, lastname и т.д.

### Твиты
#### Модуль: `src/tweets`
CRUD операции для управления твитами. Некоторые данные хешируются с помошью redis.

### Комментарии
#### Модуль `src/comments`
Управление комментариями, таблица ссылается на таблицы `users` и `tweets` через foreign key.

### Лайки
#### Модуль: `src/likes`
Контроллер предоставляет 2 метода: поставить/убрать лайк(при повторном вызове), проверить наличие лайка у твита.

### Хештеги 
#### Модуль: `src/hashtags`
Операции для управления хештегами. Имеет 2 табицы: `hashtags` содержащую информацию о хештеге и авторе, `hashtags_tweets` реализующую свзязь many to many
между хештегом и твитом.
### Подписки
#### Модуль: `src/subscriptions`
Подписка/отписка на пользователя и получение списка подписок/подписчиков.

### Helpers
#### Директория: `src/helpers`
Содержит один декоратор для получения пользователя из http запроса.

### Guards
#### Директория: `src/guards`
Содержит guard для проверки jwt токена

### Уведомления
#### Модуль: `src/notifications`
Сохраняет уведомления в БД полученные через events. Контроллер имеет 2 запроса, на чтение и получение списка непрочитаных уведомлений.

### Тесты 
#### Директория: `./test`
Реализована проверка описаных выше модулей.
В `./test/fixtures` находятся данные используемые для тестов(тестовые профили, твиты и т.д.)

### Кэширование
Реализовано с помощью библиотеки `cache-manager-redis-store`, настройки находятся в `src/app.module.ts`, редис запускается через docker, файл: `docker-compose.yml`. Кэшируются все запросы помеченые `@UseInterceptors(CacheInterceptor)` декоратором, топики с твитами, отдельные твиты, профили ползователей и топик хештегов.

