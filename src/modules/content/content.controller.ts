import { Controller, Inject, Post, Body } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import type { ContentServiceInterface } from './interface/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from './interface/content.service.interface';

@Controller('content')
export class ContentController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}

  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }
}
