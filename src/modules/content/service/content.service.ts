import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { PaginatedResult } from 'src/shared/dto/pagination-options.dto';
import { DeepPartial, QueryRunner } from 'typeorm';
import { AdminContentListRequestDto } from '../dto/admin-content-list-request.dto';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import { Content } from '../entities/content.entity';
import type { ContentRepositoryInterface } from '../repository/content.repository.interface';
import { CONTENT_REPOSITORY_INTERFACE } from '../repository/content.repository.interface';
import { TransactionService } from 'src/shared/db/transaction.service';
import { ContentServiceInterface } from './content.service.interface';

@Injectable()
export class ContentService implements ContentServiceInterface {
  constructor(
    @Inject(CONTENT_REPOSITORY_INTERFACE)
    private readonly contentRepository: ContentRepositoryInterface,
    private readonly transactionService: TransactionService,
  ) {}

  async create(createContentDto: CreateContentDto, queryRunner?: QueryRunner): Promise<Content> {
    const { publishedAt, ...rest } = createContentDto;

    const data: DeepPartial<Content> = {
      ...rest,
      views: 0,
      publishedAt: publishedAt ? new Date(publishedAt) : dayjs().utc().format(),
    };

    return this.contentRepository.create(data, queryRunner);
  }

  async findAllPaginated(dto: AdminContentListRequestDto): Promise<PaginatedResult<Content>> {
    return this.contentRepository.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortOrder: dto.sortOrder,
      dateRange: dto.dateRange,
    });
  }

  async find(id: string, queryRunner?: QueryRunner) {
    const content = await this.contentRepository.find(id, queryRunner);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto, queryRunner?: QueryRunner): Promise<Content> {
    const content = await this.contentRepository.update(id, updateContentDto, queryRunner);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  async delete(id: string, queryRunner?: QueryRunner): Promise<boolean> {

    const content = await this.contentRepository.find(id, queryRunner);

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return await this.contentRepository.delete(id, queryRunner);
  }
}
