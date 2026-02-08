import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationOptions } from '@/shared/dto/pagination-options.dto';

export enum SortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class ListCategoryDto implements PaginationOptions {
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit?: number | undefined;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
