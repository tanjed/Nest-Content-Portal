import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { QueueModule } from './infrastructure/queue/queue.module';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './shared/db/database.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ApiResponseInterceptor } from './shared/interceptors/response.interceptor';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './modules/category/category.module';

export const STORAGE_PATH = './storage';
export const TEMP_PATH = './tmp';
@Module({
  imports: [
    MulterModule.register({
      storage: {
        destination: TEMP_PATH,
        filename: (_, file, cb) => {
         cb(null, `${Date.now()}-${file.originalname}`);
        },
      }
    }),
    DatabaseModule,
    SharedModule,
    QueueModule,
    ContentModule,
    UserModule,
    CategoryModule,
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
        });
      },
    }
  ],
})

export class AppModule {}
