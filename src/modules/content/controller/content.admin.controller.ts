import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentServiceInterface } from '../service/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from '../service/content.service.interface';
import { UpdateContentDto } from '../dto/update-content.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


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
  @UseInterceptors(
    FilesInterceptor('attachments', 2, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      }
    })
  )
  @UsePipes(SlugGeneratorPipe)
  async create(@Body() createContentDto: CreateContentDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.contentService.create(createContentDto, files);
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
