import { Expose, Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { PaginationOptions } from '@/shared/dto/pagination-options.dto';
import { IsAfter } from '@/shared/validation/is-after.decorator';

class  DateRangeDto {
  @Expose({name: 'start_date'})
  @IsNotEmpty()
  @IsDateString() 
  startDate: string;

  @Expose({name: 'end_date'})
  @IsNotEmpty()
  @IsDateString()
  @IsAfter('startDate') 
  endDate: string;
}

export class AdminContentListRequestDto implements PaginationOptions {

  @IsOptional()
  @IsInt()
  @IsPositive()
  page : number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(10)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @Expose({name: 'sort_by'})
  sortBy?: string = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @Expose({name: 'sort_order'})
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DateRangeDto)  
  dateRange: DateRangeDto;
}
