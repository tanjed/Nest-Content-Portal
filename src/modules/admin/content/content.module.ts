import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TEMP_PATH } from '@/shared/constants';

import { SlugGeneratorPipe } from './pipe/slug.generator.pipe';
import { ContentServiceModule } from './service/content.service.module';
import { ContentAdminController } from './controller/content.admin.controller';
import { JwtModule } from '@/shared/jwt/jwt.module';
import { UserServiceModule } from '../user/service/user.service.module';

@Module({
  imports: [
    ContentServiceModule,
    JwtModule,
    UserServiceModule,
  ],
  controllers: [ContentAdminController],
  providers: [
    SlugGeneratorPipe
  ],
})
export class ContentModule { }
