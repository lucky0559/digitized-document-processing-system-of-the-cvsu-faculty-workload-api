import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cors = require('cors');
  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  await app.listen(3000);
}
bootstrap();
