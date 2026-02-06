import { PaginatedResult } from 'src/shared/dto/pagination-options.dto';
import { SubCategory } from '../entity/sub-category.entity';
import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dto/update-sub-category.dto';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';

export const SUB_CATEGORY_SERVICE_INTERFACE = Symbol('SUB_CATEGORY_SERVICE_INTERFACE');

export interface SubCategoryServiceInterface {
  create(data: CreateSubCategoryDto): Promise<SubCategory>;
  findAllPaginated(dto: ListSubCategoryDto): Promise<PaginatedResult<SubCategory>>;
  findOne(id: string): Promise<SubCategory>;
  update(id: string, data: UpdateSubCategoryDto): Promise<SubCategory>;
  delete(id: string): Promise<void>;
}
