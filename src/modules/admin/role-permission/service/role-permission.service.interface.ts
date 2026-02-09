import { User } from '../../user/entities/user.entity';
import { Role } from '../entity/role.entity';
import { Permission } from '../entity/permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';

export const ROLE_PERMISSION_SERVICE_INTERFACE = Symbol('ROLE_PERMISSION_SERVICE_INTERFACE');

export interface RolePermissionServiceInterface {
    getRoleByName(name: string): Promise<Role | null>;
    findRolesByIds(ids: string[]): Promise<Role[]>;
    createRole(data: CreateRoleDto): Promise<Role>;
    syncRolePermissions(roleId: string, permissionNames: string[]): Promise<void>;
    getRoles(): Promise<Role[]>;
    getPermissions(): Promise<Permission[]>;
    getRoleById(id: string): Promise<Role | null>;
}
