import { NestFactory } from '@nestjs/core';
import { SeederService } from './shared/db/seeder.service';
import { AppModule } from './app.module';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const app = await NestFactory.create(AppModule);
  await app.init();

  const seederService = app.get(SeederService);
  await seederService.run();

  await app.close();
  process.exit(0);
}

bootstrap();
