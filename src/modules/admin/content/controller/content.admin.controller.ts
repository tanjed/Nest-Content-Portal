import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentServiceInterface } from '../service/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from '../service/content.service.interface';
import { UpdateContentDto } from '../dto/update-content.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Can } from 'src/shared/decorator/permissions.decorator';
import { Permission } from '@/modules/admin/role-permission/entity/permission.entity';
import { PERMISSIONS } from '@/modules/admin/role-permission/constants/permissions';
import { AuthenticateGuard } from 'src/shared/guard/authenticate.guard';
import { AuthorizeGuard } from 'src/shared/guard/authorize.guard';


@Controller('admin/content')
@UseGuards(AuthenticateGuard)
@UseGuards(AuthorizeGuard)
export class ContentAdminController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ) { }

  @Get(':id')
  @Can(PERMISSIONS.CONTENT.VIEW)
  async getPostById(@Param('id') id: string) {
    return await this.contentService.find(id);
  }

  @Get()
  @Can(PERMISSIONS.CONTENT.VIEW)
  async getAllPosts(@Query() request: AdminContentListRequestDto) {
    return this.contentService.findAllPaginated(request);
  }

  @Post()
  @Can(PERMISSIONS.CONTENT.CREATE)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'attachments', maxCount: 10 },
      { name: 'thumbnail', maxCount: 1 },
    ], {
      limits: {
        fileSize: 5 * 1024 * 1024,
      }
    })
  )
  @UsePipes(SlugGeneratorPipe)
  async create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }
  ) {
    const thumbnail = files?.thumbnail?.[0];
    if (!thumbnail) {
      throw new NotFoundException('Thumbnail is required');
    }
    return this.contentService.create(createContentDto, thumbnail, files?.attachments);
  }

  @Put(':id')
  @Can(PERMISSIONS.CONTENT.UPDATE)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'attachments', maxCount: 10 },
      { name: 'thumbnail', maxCount: 1 },
    ], {
      limits: {
        fileSize: 5 * 1024 * 1024,
      }
    })
  )
  async update(
    @Param('id') id: string,
    updateContentDto: UpdateContentDto,
    @UploadedFiles() files: { attachments?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }
  ) {
    return this.contentService.update(id, updateContentDto, files?.thumbnail?.[0], files?.attachments);
  }

  @Delete(':id')
  @Can(PERMISSIONS.CONTENT.DELETE)
  async delete(@Param('id') id: string) {
    return this.contentService.delete(id);
  }
}
