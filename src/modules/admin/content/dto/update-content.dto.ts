import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';
import { IsOptional } from 'class-validator';

export class UpdateContentDto extends PartialType(CreateContentDto) {
    @IsOptional()
    removeAttachments?: string[]
}
