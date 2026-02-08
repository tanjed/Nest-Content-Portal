import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ContentStatus } from '../../../../shared/entities/content.entity';
import { Expose } from 'class-transformer';

export class CreateContentDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  body: string;

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
  @Expose({ name: 'published_at' })
  publishedAt?: string;
}
