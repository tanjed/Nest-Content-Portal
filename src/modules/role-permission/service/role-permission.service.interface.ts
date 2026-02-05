import { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { Role } from '../entity/role.entity';

export const ROLE_PERMISSION_SERVICE_INTERFACE = Symbol('ROLE_PERMISSION_SERVICE_INTERFACE');

export interface RolePermissionServiceInterface {
    findRolesByIds(
        ids: string[],
        relations?: FindOptionsRelations<Role>,
        select?: FindOptionsSelect<Role>,
    ): Promise<Role[]>;
}
