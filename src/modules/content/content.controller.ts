import {
  Controller,
  Inject,
  Post
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';
import type { ContentServiceInterface } from './interface/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from './interface/content.service.interface';
import { QueryFailedError } from 'typeorm';

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
    const content = this.contentService.create(d)
    return {
      id: content.id,
      title: content.title,
      thumbnail: content.thumbnail || null,
      content: content.body,
      published_at: content.publishedAt
    }
  }
}
