import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { CONTENT_REPO_TOKEN } from './interface/content.repository.interface';
import { ContentRepository, } from './repository/content.repository';

@Module({
  controllers: [ContentController],
  providers: [{
    provide: CONTENT_REPO_TOKEN,
    useClass : ContentRepository,
  },ContentService],
})
export class ContentModule {}
