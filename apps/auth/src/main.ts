import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(process.env.port ?? 5000);
}
bootstrap();
