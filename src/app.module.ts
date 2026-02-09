import { BadRequestException, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './shared/db/database.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { REQUEST_CONTEXT_STORE, STORAGE_PATH, TEMP_PATH } from './shared/constants';
import { PublicModule } from './modules/public/public.module';
import { TimeZoneInterceptor } from './shared/interceptors/timezone.interceptor';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './shared/types/request-context.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DatabaseModule,
    SharedModule,
    AdminModule,
    PublicModule,
  ],
  controllers: [],
  providers: [
    {
      provide: REQUEST_CONTEXT_STORE,
      useValue: new AsyncLocalStorage<RequestContext>(),
    },
    RequestContextMiddleware,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeZoneInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          transform: true,
          stopAtFirstError: false,
          exceptionFactory: (errors) => {
            const formattedErrors = errors.reduce((acc, error) => {
              acc[error.property] = Object.values(error.constraints || {});
              return acc;
            }, {} as Record<string, string[]>)

            return new BadRequestException({
              message: 'Invalid data',
              errors: formattedErrors
            })
          }
        });
      },
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes('*');
  }
}
