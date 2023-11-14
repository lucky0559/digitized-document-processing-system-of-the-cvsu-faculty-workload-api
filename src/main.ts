import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import serverless = require('serverless-http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);

  const expressApp = app.getHttpAdapter().getInstance();
  serverless(expressApp);
}
bootstrap();
