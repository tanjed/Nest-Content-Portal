import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
