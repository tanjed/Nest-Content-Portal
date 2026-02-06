import { BaseRepositoryInterface } from 'src/shared/base/base.repository.interface';
import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { Role } from '../entity/role.entity';

export const ROLE_REPOSITORY_INTERFACE = Symbol('ROLE_REPOSITORY_INTERFACE');

export interface RoleRepositoryInterface extends BaseRepositoryInterface<Role> {
    findByIds(
        ids: string[],
        relations?: FindOptionsRelations<Role>,
        select?: FindOptionsSelect<Role>,
    ): Promise<Role[]>;
    findByName(name: string): Promise<Role | null>;
}
