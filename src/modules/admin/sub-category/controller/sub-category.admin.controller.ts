import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dto/update-sub-category.dto';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';
import type { SubCategoryServiceInterface } from '../service/sub-category.service.interface';
import { SUB_CATEGORY_SERVICE_INTERFACE } from '../service/sub-category.service.interface';
import { PERMISSIONS } from '@/modules/admin/role-permission/constants/permissions';
import { Can } from 'src/shared/decorator/permissions.decorator';
import { AuthenticateGuard } from 'src/shared/guard/authenticate.guard';
import { AuthorizeGuard } from 'src/shared/guard/authorize.guard';
import { UseGuards } from '@nestjs/common';

@Controller('admin/sub-categories')
@UseGuards(AuthenticateGuard)
@UseGuards(AuthorizeGuard)
export class SubCategoryAdminController {
  constructor(
    @Inject(SUB_CATEGORY_SERVICE_INTERFACE)
    private readonly subCategoryService: SubCategoryServiceInterface,
  ) {}

  @Get()
  @Can(PERMISSIONS.CATEGORY.VIEW)
  async findAll(@Query() dto: ListSubCategoryDto) {
    return this.subCategoryService.findAllPaginated(dto);
  }

  @Get(':id')
  @Can(PERMISSIONS.CATEGORY.VIEW)
  async findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Post()
  @Can(PERMISSIONS.CATEGORY.CREATE)
  async create(@Body() data: CreateSubCategoryDto) {
    return this.subCategoryService.create(data);
  }

  @Put(':id')
  @Can(PERMISSIONS.CATEGORY.UPDATE)
  async update(@Param('id') id: string, @Body() data: UpdateSubCategoryDto) {
    return this.subCategoryService.update(id, data);
  }

  @Delete(':id')
  @Can(PERMISSIONS.CATEGORY.DELETE)
  async delete(@Param('id') id: string) {
    return this.subCategoryService.delete(id);
  }
}
