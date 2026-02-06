import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ListCategoryDto } from '../dto/list-category.dto';
import type { CategoryServiceInterface } from '../service/category.service.interface';
import { CATEGORY_SERVICE_INTERFACE } from '../service/category.service.interface';

@Controller('admin/categories')
export class CategoryAdminController {
  constructor(
    @Inject(CATEGORY_SERVICE_INTERFACE)
    private readonly categoryService: CategoryServiceInterface,
  ) {}

  @Get()
  async findAll(@Query() dto: ListCategoryDto) {
    return this.categoryService.findAllPaginated(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
