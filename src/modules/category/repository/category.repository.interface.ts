import { BaseRepositoryInterface } from '../../../shared/base/base.repository.interface';
import { PaginatedResult } from '../../../shared/dto/pagination-options.dto';
import { Category } from '../entity/category.entity';
import { ListCategoryDto } from '../dto/list-category.dto';

export const CATEGORY_REPOSITORY_INTERFACE = Symbol('CATEGORY_REPOSITORY_INTERFACE');

export interface CategoryRepositoryInterface extends BaseRepositoryInterface<Category> {
  findBySlug(slug: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>>;
}
