import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { CreateContentDto } from '../dto/create-content.dto';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentServiceInterface } from '../service/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from '../service/content.service.interface';


@Controller('content')
export class ContentAdminController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}

  @Post()
  @UsePipes(SlugGeneratorPipe)
  async create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }
}
