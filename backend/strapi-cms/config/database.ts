import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'ariston_suites_dev'),
      user: env('DATABASE_USERNAME', 'ariston_dev'),
      password: env('DATABASE_PASSWORD', 'Admin789.'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    debug: false,
  },
});