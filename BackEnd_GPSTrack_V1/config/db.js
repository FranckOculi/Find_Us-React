import configuration from './configuration.js';
import knex from 'knex';

export const mssql = {
  client: 'mssql',
  connection: {
    server: configuration.server,
    user: configuration.user,
    password: configuration.password,
    database: configuration.name,
  },
};

export const dbServer = knex(mssql);

export default mssql;
