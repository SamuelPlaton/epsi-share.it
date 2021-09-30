import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
  await app.listen(process.env.APP_PORT ? process.env.APP_PORT : 3000);
}

bootstrap();
