import { Controller, Get, Inject } from '@nestjs/common';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';

@Controller('admin/permissions')
export class PermissionController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) {}

    @Get()
    async findAll() {
        return this.rolePermissionService.getPermissions();
    }
}
