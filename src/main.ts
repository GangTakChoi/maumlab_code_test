import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { morgan } from './utils/morgan.util';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('customFormet'));

  await app.listen(4000);
}
bootstrap();
