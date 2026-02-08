import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_SERVICE_INTERFACE, UserServiceInterface } from '@/modules/admin/user/service/user.service.interface';
import { User } from '../../user/entities/user.entity';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entity/role.entity';
import { Permission } from '../entity/permission.entity';
import { PERMISSION_REPOSITORY_INTERFACE } from '../repository/permission.repository';
import type { PermissionRepositoryInterface } from '../repository/permission.repository.interface';
import { ROLE_REPOSITORY_INTERFACE } from '../repository/role.repository';
import type { RoleRepositoryInterface } from '../repository/role.repository.interface';
import type { RolePermissionServiceInterface } from './role-permission.service.interface';

@Injectable()
export class RolePermissionService implements RolePermissionServiceInterface {
    constructor(
        @Inject(ROLE_REPOSITORY_INTERFACE)
        private readonly roleRepository: RoleRepositoryInterface,
        @Inject(PERMISSION_REPOSITORY_INTERFACE)
        private readonly permissionRepository: PermissionRepositoryInterface,
        @Inject(forwardRef(() => USER_SERVICE_INTERFACE))
        private readonly userService: UserServiceInterface,
    ) { }

    async getRoleByName(name: string): Promise<Role | null> {
        return this.roleRepository.findByName(name);
    }

    async createRole(data: CreateRoleDto): Promise<Role> {
        // Check if role already exists
        const existing = await this.roleRepository.findByName(data.name);
        if (existing) {
            throw new Error(`Role ${data.name} already exists`);
        }

        // Create role
        const role = await this.roleRepository.create({
            name: data.name,
        });

        // Sync permissions
        if (data.permissions && data.permissions.length > 0) {
            await this.syncRolePermissions(role.id, data.permissions);
        }

        // Return role with permissions
        return this.roleRepository.findByName(role.name) as Promise<Role>;
    }

    async syncRolePermissions(roleId: string, permissionNames: string[]): Promise<void> {
        const role = await this.roleRepository.find(roleId, { permissions: true });
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        // Find or create permissions
        const permissions = await this.permissionRepository.findOrCreate(permissionNames);

        // Update role with new permissions
        role.permissions = permissions;
        await this.roleRepository.update(roleId, { permissions: permissions as any });
    }

    async findRolesByIds(ids: string[]): Promise<Role[]> {
        return this.roleRepository.findByIds(ids);
    }

    async assignRoleToUser(data: AssignRoleDto): Promise<User> {
        const user = await this.userService.findById(data.userId, { roles: true });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Fetch all roles by IDs
        const roles = await this.roleRepository.findByIds(data.roleIds, { permissions: true });

        if (roles.length !== data.roleIds.length) {
            throw new NotFoundException('One or more roles not found');
        }

        // Assign roles to user
        user.roles = roles as any;
        await this.userService.update(data.userId, { roles: roles as any });

        // Return updated user with roles
        return this.userService.findById(data.userId, { roles: true }) as Promise<User>;
    }

    async getRoles(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }

    async getPermissions(): Promise<Permission[]> {
        return this.permissionRepository.findAll();
    }

    async getRoleById(id: string): Promise<Role | null> {
        return this.roleRepository.find(id, { permissions: true });
    }
}
