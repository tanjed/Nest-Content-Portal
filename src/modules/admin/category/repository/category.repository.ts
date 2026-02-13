import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { BaseRepository } from '@/shared/base/base.abstract.interface';
import { PaginatedResult } from '@/shared/dto/pagination-options.dto';
import { ListCategoryDto } from '../dto/list-category.dto';
import { Category } from '../entity/category.entity';
import { CategoryRepositoryInterface } from './category.repository.interface';

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
      where: {
        ...where,
        parentId: IsNull(),
      },
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

  async findSubCategoriesPaginated(dto: ListCategoryDto): Promise<PaginatedResult<Category>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', search } = dto;
    const skip = (page - 1) * limit;

    const where = search ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }] : {};

    const [data, total] = await this.categoryRepository.findAndCount({
      where: {
        ...where,
        parentCategory: {
          id: Not(IsNull()),
        },
      },
      relations: { parentCategory: true },
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

  async findSubCategory(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id, parentCategory: { id: Not(IsNull()) } }, relations: { parentCategory: true } });
  }
}
