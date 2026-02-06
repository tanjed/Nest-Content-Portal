import { Inject, Injectable } from "@nestjs/common";
import { ALL_PERMISSIONS } from "src/modules/role-permission/constants/permissions";
import { DEFAULT_ROLE } from "src/modules/role-permission/role-permission.module";
import type { RolePermissionServiceInterface } from "src/modules/role-permission/service/role-permission.service.interface";
import { ROLE_PERMISSION_SERVICE_INTERFACE } from "src/modules/role-permission/service/role-permission.service.interface";
import { SeederInterface } from "./core/seeder.interface";
import { Seeder } from "./core/decorator";
import { PERMISSION_REPOSITORY_INTERFACE } from "src/modules/role-permission/repository/permission.repository.interface";
import type { PermissionRepositoryInterface } from "src/modules/role-permission/repository/permission.repository.interface";

@Seeder({priority: 1})
@Injectable()
export class RolePermissionSeeder implements SeederInterface {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
        @Inject(PERMISSION_REPOSITORY_INTERFACE)
        private readonly permissionRepository: PermissionRepositoryInterface,
    ) {}

    async seed() {
        let createdPermissions = await this.permissionRepository.findAll().then(perms => perms.map(p => p.name));
        let permissions = [...ALL_PERMISSIONS] as string[];
        permissions = permissions.filter((p) => !createdPermissions.includes(p));

        const roles = [
           {
                name: DEFAULT_ROLE,
                permissions: permissions,
           }
        ];

        for (const role of roles) {
            const exists = await this.rolePermissionService.getRoleByName(role.name);
            if (!exists) {
                await this.rolePermissionService.createRole({name: role.name, permissions: role.permissions});
                console.log(`Seeded role: ${role.name}`);
            } else {
                await this.rolePermissionService.syncRolePermissions(exists.id, role.permissions);
                console.log(`Updated permissions for role: ${role.name}`);
            }
        }
    }
}