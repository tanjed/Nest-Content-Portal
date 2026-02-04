import { Body, Controller, Get, Inject, NotFoundException, Post, Query, UsePipes } from '@nestjs/common';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentServiceInterface } from '../service/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from '../service/content.service.interface';


@Controller('admin/content')
export class ContentAdminController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}

  @Get(':id')
  async getPostById(id: string) {
    const content = await this.contentService.find(id);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  @Get()
  async getAllPosts(@Query() request: AdminContentListRequestDto) {
    return this.contentService.findAllPaginated(request);
  }

  @Post()
  @UsePipes(SlugGeneratorPipe)
  async create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  async update() {}
  async delete() {}
}
