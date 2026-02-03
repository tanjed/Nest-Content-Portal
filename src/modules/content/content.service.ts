import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import type { ContentRepositoryInterface } from './interface/content.repository.interface';
import { CONTENT_REPOSITORY_INTERFACE } from './interface/content.repository.interface';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY_INTERFACE)
    private readonly contentRepository: ContentRepositoryInterface,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const { publishedAt, ...rest } = createContentDto;

    const data: Partial<Content> = {
      ...rest,
      views: 0,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
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
