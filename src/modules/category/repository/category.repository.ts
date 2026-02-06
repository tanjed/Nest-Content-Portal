import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../shared/base/base.abstract.interface';
import { PaginatedResult } from '../../../shared/dto/pagination-options.dto';
import { Like, Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CategoryRepositoryInterface } from './category.repository.interface';
import { ListCategoryDto } from '../dto/list-category.dto';

export const CATEGORY_REPOSITORY_INTERFACE = Symbol('CATEGORY_REPOSITORY_INTERFACE');

export class CategoryRepository extends BaseRepository<Category> implements CategoryRepositoryInterface {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { slug } as any });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { name } as any });
  }

  async findPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', search } = dto;
    const skip = (page - 1) * limit;

    const where = search ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }] : {};

    const [data, total] = await this.categoryRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
