import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dto/update-sub-category.dto';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';
import type { SubCategoryServiceInterface } from '../service/sub-category.service.interface';
import { SUB_CATEGORY_SERVICE_INTERFACE } from '../service/sub-category.service.interface';

@Controller('admin/sub-categories')
export class SubCategoryAdminController {
  constructor(
    @Inject(SUB_CATEGORY_SERVICE_INTERFACE)
    private readonly subCategoryService: SubCategoryServiceInterface,
  ) {}

  @Get()
  async findAll(@Query() dto: ListSubCategoryDto) {
    return this.subCategoryService.findAllPaginated(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateSubCategoryDto) {
    return this.subCategoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSubCategoryDto) {
    return this.subCategoryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subCategoryService.delete(id);
  }
}
