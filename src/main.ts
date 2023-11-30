import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { morgan } from './utils/morgan.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('customFormet'));

  await app.listen(4000);
}
bootstrap();
