import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentServiceInterface } from '../service/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from '../service/content.service.interface';
import { UpdateContentDto } from '../dto/update-content.dto';


@Controller('admin/content')
export class ContentAdminController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.contentService.find(id);
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

  @Put(':id')
  async update(@Param('id') id: string, updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contentService.delete(id);
  }
}
