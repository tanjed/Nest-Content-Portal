import { BaseRepositoryInterface } from 'src/shared/base/base.repository.interface';
import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { Permission } from '../entity/permission.entity';

export const PERMISSION_REPOSITORY_INTERFACE = Symbol('PERMISSION_REPOSITORY_INTERFACE');

export interface PermissionRepositoryInterface extends BaseRepositoryInterface<Permission> {
    findByIds(
        ids: string[],
        relations?: FindOptionsRelations<Permission>,
        select?: FindOptionsSelect<Permission>,
    ): Promise<Permission[]>;
    findByName(name: string): Promise<Permission | null>;
    findByNames(names: string[]): Promise<Permission[]>;
    findOrCreate(names: string[]): Promise<Permission[]>;
}
