import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  nodeEnv: process.env.NODE_ENV,
  username: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
