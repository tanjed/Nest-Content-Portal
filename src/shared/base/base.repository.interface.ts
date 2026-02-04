import { DeepPartial, QueryRunner } from "typeorm";

export interface BaseRepositoryInterface<T> {
    find(id: string, queryRunner?: QueryRunner): Promise<T | null>;
    findAll(queryRunner?: QueryRunner): Promise<T[]>;
    create(c: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T>;
    update(id: string, params: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T | null>;
    delete(id: string, queryRunner?: QueryRunner): Promise<boolean>;
}
