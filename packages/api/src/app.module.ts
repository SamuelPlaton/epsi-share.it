import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  DatasModule,
  UsersModule,
  UsersWorkspacesModule,
  WorkspacesModule,
} from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `env/.${process.env.NODE_ENV}.env`
        : 'env/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['src/migration/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migration',
      },
      synchronize: true,
    }),
    DatasModule,
    UsersModule,
    UsersWorkspacesModule,
    WorkspacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
