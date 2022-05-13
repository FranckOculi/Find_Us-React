// 'use strict';
import dotenv from 'dotenv';
dotenv.config();

const data = {
  api_endpoint: process.env.REACT_APP_API_ENDPOINT,
  api_url: process.env.REACT_APP_API_URL,
};

export default data;
