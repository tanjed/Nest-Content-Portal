import { ContentStatus } from '../entities/content.entity';
import { IsString, IsEnum, IsOptional, IsUUID, MaxLength, IsDateString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsUUID()
  authorId: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
