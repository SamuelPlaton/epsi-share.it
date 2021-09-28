export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'pwsio',
  database: 'shareit',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration'
  },
  synchronize: true,
}
