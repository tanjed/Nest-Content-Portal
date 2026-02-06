import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../../shared/base/base.abstract.interface';
import { PaginatedResult } from '../../../../shared/dto/pagination-options.dto';
import { Like, Repository } from 'typeorm';
import { SubCategory } from '../entity/sub-category.entity';
import { SubCategoryRepositoryInterface } from './sub-category.repository.interface';
import { ListSubCategoryDto } from '../dto/list-sub-category.dto';

export const SUB_CATEGORY_REPOSITORY_INTERFACE = Symbol('SUB_CATEGORY_REPOSITORY_INTERFACE');

export class SubCategoryRepository extends BaseRepository<SubCategory> implements SubCategoryRepositoryInterface {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {
    super(subCategoryRepository);
  }

  async findBySlug(slug: string): Promise<SubCategory | null> {
    return this.subCategoryRepository.findOne({ where: { slug } as any });
  }

  async findByCategorySlug(categorySlug: string): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({
      where: { categorySlug: categorySlug } as any,
      relations: { category: true },
    });
  }

  async findPaginated(dto: ListSubCategoryDto): Promise<PaginatedResult<SubCategory>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', search, categorySlug } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }
    if (categorySlug) {
      where.categorySlug = categorySlug;
    }

    const [data, total] = await this.subCategoryRepository.findAndCount({
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
