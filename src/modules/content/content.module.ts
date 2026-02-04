import { Module } from '@nestjs/common';

import { SlugGeneratorPipe } from './pipe/slug.generator.pipe';
import { ContentServiceModule } from './service/content.service.module';
import { ContentAdminController } from './controller/content.admin.controller';

@Module({
  imports: [ContentServiceModule],
  controllers: [ContentAdminController],
  providers: [
    SlugGeneratorPipe
  ],
})
export class ContentModule {}
