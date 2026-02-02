import {
  Controller,
  Inject,
  Post
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';
import type { ContentServiceInterface } from './interface/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from './interface/content.service.interface';

/**
 * Content Controller - HTTP Layer
 * Following Single Responsibility Principle - handles HTTP only
 */
@Controller('content')
export class ContentController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}

  @Post()
  create(d: CreateContentDto) {
    try {
      const content = this.contentService.create(d)
    } catch(err : unknown) {
        
    }
  }
}
