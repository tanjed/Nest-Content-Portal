import { BaseRepositoryInterface } from 'src/shared/base/base.repository.interface';
import { Role } from '../entity/role.entity';

export const ROLE_REPOSITORY_INTERFACE = Symbol('ROLE_REPOSITORY_INTERFACE');

export interface RoleRepositoryInterface extends BaseRepositoryInterface<Role> {
    findByIds(ids: string[]): Promise<Role[]>;
}
