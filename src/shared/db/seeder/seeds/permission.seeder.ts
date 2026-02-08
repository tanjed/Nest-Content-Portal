import { Inject, Injectable } from "@nestjs/common";
import { ALL_PERMISSIONS } from "@/modules/admin/role-permission/constants/permissions";
import { PERMISSION_REPOSITORY_INTERFACE } from "@/modules/admin/role-permission/repository/permission.repository";
import type { PermissionRepositoryInterface } from "@/modules/admin/role-permission/repository/permission.repository.interface";
import { Seeder } from "../core/decorator";
import { SeederInterface } from "../core/seeder.interface";

@Seeder({priority: 0})
@Injectable()
export class PermissionSeeder implements SeederInterface {
    constructor(
        @Inject(PERMISSION_REPOSITORY_INTERFACE)
        private readonly permissionRepository: PermissionRepositoryInterface,
    ) {}
    
   async seed(): Promise<void> {
        let permissions = [...ALL_PERMISSIONS] as string[];

        const createdPermissions = await this.permissionRepository.findByNames(permissions).then(existing => existing.map(p => p.name));
        permissions = permissions.filter((p) => createdPermissions.includes(p));

        for (const permission of permissions) {
            await this.permissionRepository.create({name: permission})
        }
    }
}