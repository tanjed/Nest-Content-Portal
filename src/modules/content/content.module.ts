import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './controller/content.controller';
import { Content } from './entities/content.entity';

import { ContentRepository } from './repository/content.repository';
import { CONTENT_REPOSITORY_INTERFACE } from './repository/content.repository.interface';
import { ContentService } from './service/content.service';
import { CONTENT_SERVICE_INTERFACE } from './service/content.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [ContentController],
  providers: [
    ContentRepository,
    {
      provide: CONTENT_REPOSITORY_INTERFACE,
      useClass: ContentRepository,
    },
    {
      provide: CONTENT_SERVICE_INTERFACE,
      useClass: ContentService,
    }
  ],
  exports : [CONTENT_SERVICE_INTERFACE],
})
export class ContentModule {}
