import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');
  app.enableCors();
  await app.listen(port);
  logger.log(`Application started on port ${port}`);
}
bootstrap();
