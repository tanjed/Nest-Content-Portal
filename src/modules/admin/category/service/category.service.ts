import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PaginatedResult } from '@/shared/dto/pagination-options.dto';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ListCategoryDto } from '../dto/list-category.dto';
import type { CategoryRepositoryInterface } from '../repository/category.repository.interface';
import { CATEGORY_REPOSITORY_INTERFACE } from '../repository/category.repository.interface';
import type { CategoryServiceInterface } from './category.service.interface';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(
    @Inject(CATEGORY_REPOSITORY_INTERFACE)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const existingByName = await this.categoryRepository.findByName(data.name);
    if (existingByName) {
      throw new UnprocessableEntityException('Category with this name already exists');
    }

    const existingBySlug = await this.categoryRepository.findBySlug(data.slug);
    if (existingBySlug) {
      throw new UnprocessableEntityException('Category with this slug already exists');
    }

    return this.categoryRepository.create(data);
  }

  async findAllPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>> {
    return this.categoryRepository.findPaginated(dto);
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.find(id, {
      subCategories: true,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.update(id, data);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Category not found');
    }
  }
}
