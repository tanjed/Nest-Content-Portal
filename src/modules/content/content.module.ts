import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { CONTENT_REPOSITORY_INTERFACE } from './interface/content.repository.interface';
import { CONTENT_SERVICE_INTERFACE } from './interface/content.service.interface';
import { ContentRepository, } from './repository/content.repository';

@Module({
  controllers: [ContentController],
  providers: [
    {
      provide: CONTENT_REPOSITORY_INTERFACE,
      useClass: ContentRepository,
    }, 
    {
      provide: CONTENT_SERVICE_INTERFACE,
      useClass: ContentService,
    }
],
})
export class ContentModule {}
