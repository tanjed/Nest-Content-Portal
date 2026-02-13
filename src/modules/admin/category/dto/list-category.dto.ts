import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationOptions } from '@/shared/dto/pagination-options.dto';

export enum SortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class ListCategoryDto implements PaginationOptions {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
