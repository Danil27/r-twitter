import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

export default registerAs('database', () => ({
  dialect: 'postgres' as Dialect,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
}));
