import { NestFactory } from '@nestjs/core';
import { SeederService } from './shared/db/seeder.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const seederService = app.get(SeederService);
  await seederService.run();

  await app.close();
  process.exit(0);
}

bootstrap();
