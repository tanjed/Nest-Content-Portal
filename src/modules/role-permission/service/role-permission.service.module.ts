import { Module } from "@nestjs/common";
import { ROLE_PERMISSION_SERVICE_INTERFACE } from "./role-permission.service.interface";
import { RoleRepository } from "../repository/role.repository";
import { RolePermissionService } from "./role-permission.service";
import { ROLE_REPOSITORY_INTERFACE } from "../repository/role.repository.interface";
import { PermissionRepository } from "../repository/permission.repository";

@Module({
    providers: [
        RoleRepository,
        PermissionRepository,
        {
        provide: ROLE_PERMISSION_SERVICE_INTERFACE,
        useExisting: RolePermissionService,
    },
    {
        provide: ROLE_REPOSITORY_INTERFACE,
        useExisting: RoleRepository,
    },
    {
        provide: ROLE_PERMISSION_SERVICE_INTERFACE,
        useClass: RolePermissionService,        
    }],
    exports: [ROLE_PERMISSION_SERVICE_INTERFACE],
})
export class RolePermissionServiceModule {}