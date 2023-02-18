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

