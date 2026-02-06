import { Module } from '@nestjs/common';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './shared/db/database.module';
import { SharedModule } from './shared/shared.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      storage: {
        destination: './tmp',
        filename: (_, file, cb) => {
         cb(null, `${Date.now()}-${file.originalname}`);
        },
      }
    }),
    DatabaseModule,
    SharedModule,
    ContentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
