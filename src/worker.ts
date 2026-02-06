import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { WorkerModule } from './infrastructure/queue/worker.module';

async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const app = await NestFactory.create(WorkerModule);
  await app.init();
  console.log('Worker is running...');
}

bootstrap();
