import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../entity/role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ROLE_REPOSITORY_INTERFACE } from '../repository/role.repository';
import { PERMISSION_REPOSITORY_INTERFACE } from '../repository/permission.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/modules/user/repository/user.repository.interface';
import type { RoleRepositoryInterface } from '../repository/role.repository.interface';
import type { PermissionRepositoryInterface } from '../repository/permission.repository.interface';
import type { UserRepositoryInterface } from 'src/modules/user/repository/user.repository.interface';
import type { RolePermissionServiceInterface } from './role-permission.service.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';

@Injectable()
export class RolePermissionService implements RolePermissionServiceInterface {
    constructor(
        @Inject(ROLE_REPOSITORY_INTERFACE)
        private readonly roleRepository: RoleRepositoryInterface,
        @Inject(PERMISSION_REPOSITORY_INTERFACE)
        private readonly permissionRepository: PermissionRepositoryInterface,
        @Inject(USER_REPOSITORY_INTERFACE)
        private readonly userRepository: UserRepositoryInterface,
    ) {}

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

    async assignRoleToUser(data: AssignRoleDto): Promise<User> {
        const user = await this.userRepository.find(data.userId, { roles: true });
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
        await this.userRepository.update(data.userId, { roles: roles as any });

        // Return updated user with roles
        return this.userRepository.find(data.userId, { roles: true }) as Promise<User>;
    }
}
