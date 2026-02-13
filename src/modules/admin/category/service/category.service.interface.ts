import { PaginatedResult } from '@/shared/dto/pagination-options.dto';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ListCategoryDto } from '../dto/list-category.dto';

export const CATEGORY_SERVICE_INTERFACE = Symbol('CATEGORY_SERVICE_INTERFACE');

export interface CategoryServiceInterface {
  create(data: CreateCategoryDto): Promise<Category>;
  findAllPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>>;
  findAllSubCategoriesPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>>;
  findOne(id: string): Promise<Category>;
  findOneSubCategory(id: string): Promise<Category>;
  update(id: string, data: UpdateCategoryDto): Promise<Category>;
  delete(id: string): Promise<void>;
}
