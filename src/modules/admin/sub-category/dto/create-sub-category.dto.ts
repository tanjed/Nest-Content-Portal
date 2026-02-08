import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  @IsString()
  categorySlug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
