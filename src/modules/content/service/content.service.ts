import { Inject, Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import dayjs from 'dayjs';
import { DeepPartial } from 'typeorm';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import { Content } from '../entities/content.entity';
import { SlugGeneratorPipe } from '../pipe/slug.generator.pipe';
import type { ContentRepositoryInterface } from '../repository/content.repository.interface';
import { CONTENT_REPOSITORY_INTERFACE } from '../repository/content.repository.interface';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY_INTERFACE)
    private readonly contentRepository: ContentRepositoryInterface,
  ) {}

  @UsePipes(new SlugGeneratorPipe())
  async create(createContentDto: CreateContentDto): Promise<Content> {
    const { publishedAt, ...rest } = createContentDto;

    const data: DeepPartial<Content> = {
      ...rest,
      views: 0,
      publishedAt: publishedAt ? new Date(publishedAt) : dayjs().utc().format(),
    };

    return this.contentRepository.create(data);
  }

  findAll() {
    return `This action returns all content`;
  }

  async findOne(id: string) {
    const content = await this.contentRepository.find(id)

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
