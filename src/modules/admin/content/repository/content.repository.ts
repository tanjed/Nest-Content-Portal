import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import { BaseRepository } from "../../../../shared/base/base.abstract.interface";
import { PaginatedResult } from "../../../../shared/dto/pagination-options.dto";
import { Between, Repository, QueryRunner } from "typeorm";
import { AdminContentListRequestDto } from "../dto/admin-content-list-request.dto";
import { ContentRepositoryInterface } from "./content.repository.interface";
import { Content } from "../../../../shared/entities/content.entity";

@Injectable()
export class ContentRepository extends BaseRepository<Content> implements ContentRepositoryInterface {
    constructor(
        @InjectRepository(Content)
        protected readonly repository: Repository<Content>,
    ){
        super(repository)
    }

    async findPaginated(options: AdminContentListRequestDto, queryRunner?: QueryRunner): Promise<PaginatedResult<Content>> {
        const {
            page = 1,
            limit = 10,
            sortBy = 'publishedAt',
            sortOrder,
            dateRange,
        } = options;

        const repo = this.getRepository(this.repository, queryRunner);
        const skip = (page - 1) * limit;

        const [data, total] = await repo.findAndCount({
            where: {
                createdAt: Between(
                    dayjs(dateRange.startDate).toDate(),
                    dayjs(dateRange.endDate).toDate(),
                ),
            },
            relations: {
                author: true,
            },
            select: {
                id: true,
                title: true,
                body: true,
                thumbnail: true,
                status: true,
                authorId: true,
                categoryId: true,
                slug: true,
                views: true,
                publishedAt: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    id: true,
                    full_name: true,
                },
            },
            order: { [sortBy] : sortOrder },
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
