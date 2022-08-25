import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  app.enableCors();
  await app.listen(port);
}
bootstrap();
