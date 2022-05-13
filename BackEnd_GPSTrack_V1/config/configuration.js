// 'use strict';
import dotenv from 'dotenv';
dotenv.config();

const data = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  port: process.env.DB_PORT,
  tokenSecret: process.env.TOKEN_SECRET,
  env: process.env.ENV,
};

export default data;
