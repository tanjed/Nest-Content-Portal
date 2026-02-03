import { DeepPartial } from "typeorm";

export interface BaseRepositoryInterface<T> {
    find(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(c: DeepPartial<T>): Promise<T>;
    update(id : string, params : DeepPartial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
