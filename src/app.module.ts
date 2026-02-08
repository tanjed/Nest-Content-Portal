import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './shared/db/database.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { STORAGE_PATH, TEMP_PATH } from './shared/constants';
import { PublicModule } from './modules/public/public.module';
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
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        new ValidationPipe({
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

export class AppModule { }
