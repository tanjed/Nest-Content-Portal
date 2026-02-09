import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AppModule } from './app.module';

async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    headers: ['*'],
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
