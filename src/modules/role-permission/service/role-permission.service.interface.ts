import { User } from 'src/modules/user/entities/user.entity';
import { Role } from '../entity/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';

export const ROLE_PERMISSION_SERVICE_INTERFACE = Symbol('ROLE_PERMISSION_SERVICE_INTERFACE');

export interface RolePermissionServiceInterface {
    getRoleByName(name: string): Promise<Role | null>;
    findRolesByIds(ids: string[]): Promise<Role[]>;
    createRole(data: CreateRoleDto): Promise<Role>;
    assignRoleToUser(data: AssignRoleDto): Promise<User>;
    syncRolePermissions(roleId: string, permissionNames: string[]): Promise<void>;
}
