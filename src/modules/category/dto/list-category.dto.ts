import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginatedOptionsDto } from 'src/shared/dto/pagination-options.dto';

export enum SortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class ListCategoryDto extends PaginatedOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;
}
