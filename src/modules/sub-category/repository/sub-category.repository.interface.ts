import { BaseRepositoryInterface } from 'src/shared/base/base.repository.interface';
import { PaginatedResult } from 'src/shared/dto/pagination-options.dto';
import { SubCategory } from '../entity/sub-category.entity';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';

export const SUB_CATEGORY_REPOSITORY_INTERFACE = Symbol('SUB_CATEGORY_REPOSITORY_INTERFACE');

export interface SubCategoryRepositoryInterface extends BaseRepositoryInterface<SubCategory> {
  findBySlug(slug: string): Promise<SubCategory | null>;
  findByCategorySlug(categorySlug: string): Promise<SubCategory[]>;
  findPaginated(dto: ListSubCategoryDto): Promise<PaginatedResult<SubCategory>>;
}
