import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PaginatedResult } from '../../../shared/dto/pagination-options.dto';
import { SubCategory } from '../entity/sub-category.entity';
import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dto/update-sub-category.dto';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';
import type { SubCategoryRepositoryInterface } from '../repository/sub-category.repository.interface';
import { SUB_CATEGORY_REPOSITORY_INTERFACE } from '../repository/sub-category.repository';
import { CATEGORY_REPOSITORY_INTERFACE, type CategoryRepositoryInterface } from '../../category/repository/category.repository.interface';
import type { SubCategoryServiceInterface } from './sub-category.service.interface';

@Injectable()
export class SubCategoryService implements SubCategoryServiceInterface {
  constructor(
    @Inject(SUB_CATEGORY_REPOSITORY_INTERFACE)
    private readonly subCategoryRepository: SubCategoryRepositoryInterface,
    @Inject(CATEGORY_REPOSITORY_INTERFACE)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async create(data: CreateSubCategoryDto): Promise<SubCategory> {
    const category = await this.categoryRepository.findBySlug(data.categorySlug);
    if (!category) {
      throw new UnprocessableEntityException('Category not found');
    }

    return this.subCategoryRepository.create({
      ...data,
      categorySlug: category.slug,
    });
  }

  async findAllPaginated(dto: ListSubCategoryDto): Promise<PaginatedResult<SubCategory>> {
    return this.subCategoryRepository.findPaginated(dto);
  }

  async findOne(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.find(id, {
      category: true,
    });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    return subCategory;
  }

  async update(id: string, data: UpdateSubCategoryDto): Promise<SubCategory> {
    if (data.categorySlug) {
      const category = await this.categoryRepository.findBySlug(data.categorySlug);
      if (!category) {
        throw new UnprocessableEntityException('Category not found');
      }
    }

    const subCategory = await this.subCategoryRepository.update(id, data);
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    return subCategory;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.subCategoryRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('SubCategory not found');
    }
  }
}
