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
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let http= require("http").Server(app);
  let io = require("socket.io")(http);

  // serve static assets from client/dist folder
  app.use(express.static(join(process.cwd(), 'client/build')));

  io.on("connection", function(socket:any){
    console.log("a user has connected");
  });

  await app.listen(process.env.PORT || 5000);

 
}
bootstrap();
