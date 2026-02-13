import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { DeepPartial, QueryRunner } from 'typeorm';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import type { ContentRepositoryInterface } from '../repository/content.repository.interface';
import { CONTENT_REPOSITORY_INTERFACE } from '../repository/content.repository.interface';
import { ContentServiceInterface } from './content.service.interface';
import type { AttachmentServiceInterface } from '../../attachments/service/attachment.service.interface';
import { ATTACHMENT_SERVICE_INTERFACE } from '../../attachments/service/attachment.service.interface';
import { Content } from '../../../../shared/entities/content.entity';
import * as fs from 'fs';
import { STORAGE_PATH } from '../../../../shared/constants';
import { randomUUID } from 'crypto';
import { join } from 'path';

@Injectable()
export class ContentService implements ContentServiceInterface {
  constructor(
    @Inject(CONTENT_REPOSITORY_INTERFACE)
    private readonly contentRepository: ContentRepositoryInterface,
    @Inject(ATTACHMENT_SERVICE_INTERFACE)
    private readonly attachmentService: AttachmentServiceInterface,
  ) { }

  async create(createContentDto: CreateContentDto, thumbnail: Express.Multer.File, files?: Express.Multer.File[], queryRunner?: QueryRunner): Promise<Content> {
    const { publishedAt, ...rest } = createContentDto;

    const data: DeepPartial<Content> = {
      ...rest,
      views: 0,
      publishedAt: publishedAt ? new Date(publishedAt) : dayjs().utc().format(),
    };

    const filename = thumbnail.filename || thumbnail.originalname;
    const thumbnailFileName = `${randomUUID()}-${filename}` + '.' + thumbnail.mimetype.split('/')[1];
    const destPath = join(STORAGE_PATH, thumbnailFileName);

    await fs.promises.mkdir(STORAGE_PATH, { recursive: true });

    if (thumbnail.path) {
      await fs.promises.copyFile(thumbnail.path, destPath);
      await fs.promises.unlink(thumbnail.path);
    } else if (thumbnail.buffer) {
      await fs.promises.writeFile(destPath, thumbnail.buffer);
    }

    data.thumbnail = thumbnailFileName;
    const content = await this.contentRepository.create(data, queryRunner);

    if (files && files.length > 0) {
      await this.attachmentService.enqueueAttachmentForUpload(content.id, files);
    }
    return content;
  }

  async findAllPaginated(dto: AdminContentListRequestDto): Promise<PaginatedResponseDto<Content>> {
    return this.contentRepository.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortOrder: dto.sortOrder,
      dateRange: dto.dateRange,
    });
  }

  async find(id: string, queryRunner?: QueryRunner): Promise<Content> {
    const content = await this.contentRepository.find(id);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto, thumbnail?: Express.Multer.File, files?: Express.Multer.File[], queryRunner?: QueryRunner): Promise<Content> {
    const data: DeepPartial<Content> = { ...updateContentDto };

    if (thumbnail) {
      const filename = thumbnail.filename || thumbnail.originalname;
      const thumbnailFileName = `${randomUUID()}-${filename}` + '.' + thumbnail.mimetype.split('/')[1];
      const destPath = join(STORAGE_PATH, thumbnailFileName);

      await fs.promises.mkdir(STORAGE_PATH, { recursive: true });

      if (thumbnail.path) {
        await fs.promises.copyFile(thumbnail.path, destPath);
        await fs.promises.unlink(thumbnail.path);
      } else if (thumbnail.buffer) {
        await fs.promises.writeFile(destPath, thumbnail.buffer);
      }

      data.thumbnail = thumbnailFileName;
    }

    const content = await this.contentRepository.update(id, data, queryRunner);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    if (files && files.length > 0) {
      await this.attachmentService.enqueueAttachmentForUpload(content.id, files);
    }

    return content;
  }

  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    const deleted = await this.contentRepository.delete(id, queryRunner);

    if (!deleted) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }
}
