import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationOptions } from '../../../../shared/dto/pagination-options.dto';

export enum SortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class ListSubCategoryDto implements PaginationOptions {
  page: number;
  limit?: number | undefined;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  categorySlug?: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
