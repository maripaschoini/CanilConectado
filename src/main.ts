import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configura o body-parser com um limite maior
   app.use(bodyParser.json({ limit: '100mb' })); // Ajuste o limite conforme necessário
   app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

  app.use(express.static('public'));

  

  await app.listen(3000);
}
bootstrap();
