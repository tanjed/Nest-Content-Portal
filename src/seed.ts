import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DatabaseModule } from './shared/db/database.module';
import { SeederService } from './shared/db/seeder/seeder.service';
async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const app = await NestFactory.create(DatabaseModule);
  await app.init();

  const seederService = app.get(SeederService);
  await seederService.run();

  await app.close();
  process.exit(0);
}

bootstrap();
