const dotenv = require('dotenv');
dotenv.config();

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration'
  },
  synchronize: true,
}
