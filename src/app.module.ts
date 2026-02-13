import { BadRequestException, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './shared/db/database.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { REQUEST_CONTEXT_STORE, STORAGE_PATH, TEMP_PATH } from './shared/constants';
import { PublicModule } from './modules/public/public.module';
import { TimeZoneInterceptor } from './shared/interceptors/timezone.interceptor';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './shared/types/request-context.type';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';


import { QueueModule } from './infrastructure/queue/queue.module';

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
    ServeStaticModule.forRoot({
      rootPath: STORAGE_PATH,
      serveRoot: '/storage',
    }),
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}

