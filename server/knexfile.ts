import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'inventory',
      user: 'inventory',
      password: 'password',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'inventory',
      user: 'inventory',
      password: 'password',
    },
  },
};

module.exports = config;
