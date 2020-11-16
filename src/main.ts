
import { resolve } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: resolve(__dirname,'../.env'),
  debug: true
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // serve static assets from client/dist folder
  app.use(express.static(join(process.cwd(), 'client/build')));


  await app.listen(process.env.PORT || 5000);
}
bootstrap();