import { BaseRepositoryInterface } from "@/shared/base/base.repository.interface";
import { PaginatedResult } from "@/shared/dto/pagination-options.dto";
import { QueryRunner } from "typeorm";
import { AdminContentListRequestDto } from "../dto/admin-content-list-request.dto";
import { Content } from "../entities/content.entity";

export const CONTENT_REPOSITORY_INTERFACE = Symbol('CONTENT_REPOSITORY_INTERFACE');

export interface ContentRepositoryInterface extends BaseRepositoryInterface<Content> {
    findPaginated(options: AdminContentListRequestDto, queryRunner?: QueryRunner): Promise<PaginatedResult<Content>>;
}
