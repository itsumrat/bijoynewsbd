import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  await server.listen(3000);
}

bootstrap();
