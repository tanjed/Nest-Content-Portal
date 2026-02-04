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

@Injectable()
export class ContentService {
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

  findAll(queryRunner?: QueryRunner) {
    return this.contentRepository.findAll(queryRunner);
  }

  findAllPaginated(dto: AdminContentListRequestDto): Promise<PaginatedResult<Content>> {
    return this.contentRepository.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortOrder: dto.sortOrder,
      dateRange: dto.dateRange,
    });
  }

  async findOne(id: string, queryRunner?: QueryRunner) {
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

  async remove(id: string, queryRunner?: QueryRunner): Promise<void> {
    const deleted = await this.contentRepository.delete(id, queryRunner);

    if (!deleted) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }
}
