import { BaseRepositoryInterface } from "src/shared/base/base.repository.interface";
import { Content } from "../entities/content.entity";
import { PaginatedResult, PaginationOptions } from "src/shared/dto/pagination-options.dto";
import { QueryRunner } from "typeorm";

export const CONTENT_REPOSITORY_INTERFACE = Symbol('CONTENT_REPOSITORY_INTERFACE');

export interface ContentRepositoryInterface extends BaseRepositoryInterface<Content> {
    findPaginated(options?: PaginationOptions, queryRunner?: QueryRunner): Promise<PaginatedResult<Content>>;
}
