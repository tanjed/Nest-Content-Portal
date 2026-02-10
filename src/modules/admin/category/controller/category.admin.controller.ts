import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ListCategoryDto } from '../dto/list-category.dto';
import type { CategoryServiceInterface } from '../service/category.service.interface';
import { CATEGORY_SERVICE_INTERFACE } from '../service/category.service.interface';
import { Can } from 'src/shared/decorator/permissions.decorator';
import { PERMISSIONS } from '@/modules/admin/role-permission/constants/permissions';
import { AuthorizeGuard } from 'src/shared/guard/authorize.guard';
import { AuthenticateGuard } from 'src/shared/guard/authenticate.guard';

@Controller('admin/categories')
@UseGuards(AuthenticateGuard, AuthorizeGuard)
export class CategoryAdminController {
  constructor(
    @Inject(CATEGORY_SERVICE_INTERFACE)
    private readonly categoryService: CategoryServiceInterface,
  ) { }

  @Get()
  @Can(PERMISSIONS.CATEGORY.VIEW)
  async findAll(@Query() dto: ListCategoryDto) {
    return this.categoryService.findAllPaginated(dto);
  }

  @Get(':id')
  @Can(PERMISSIONS.CATEGORY.VIEW)
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @Can(PERMISSIONS.CATEGORY.CREATE)
  async create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  @Can(PERMISSIONS.CATEGORY.UPDATE)
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  @Can(PERMISSIONS.CATEGORY.DELETE)
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
