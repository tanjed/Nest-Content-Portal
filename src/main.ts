import { NestFactory, Reflector } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { TimeZoneInterceptor } from './shared/interceptors/timezone.interceptor';
import { CONTEXT_SERVICE_INTERFACE } from './shared/services/context.service.interface';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';

async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const app = await NestFactory.create(AppModule);
  const contextService = app.get(CONTEXT_SERVICE_INTERFACE);
  const reflector = app.get(Reflector);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalInterceptors(new TimeZoneInterceptor(contextService, reflector));


  app.enableCors({
    headers: ['*'],
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
