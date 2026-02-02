import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ApiResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global exception filter for errors (4xx, 5xx)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptor for success responses (2xx)
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  // Validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: false,
    exceptionFactory : (errors) => {
      const formattedErrors = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints || {});
          return acc;
        }, {} as Record<string, string[]>)

        return new BadRequestException({
            message : 'Invalid data',
            errors : formattedErrors
        })
      }
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
