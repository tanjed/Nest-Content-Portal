import { NestFactory, Reflector } from '@nestjs/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { TimeZoneInterceptor } from './shared/interceptors/timezone.interceptor';
import { ContextService } from './shared/services/context.service';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './shared/types/request-context.type';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';

async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const app = await NestFactory.create(AppModule);
  const contextService = new ContextService(new AsyncLocalStorage<RequestContext>());
  const reflector = new Reflector();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalInterceptors(new TimeZoneInterceptor(contextService, reflector));
  app.use(new RequestContextMiddleware(contextService));

  app.enableCors({
    headers: ['*'],
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
