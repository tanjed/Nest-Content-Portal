import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { SyncPermissionsDto } from '../dto/sync-permissions.dto';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';

@Controller('admin/role-permissions')
export class RolePermissionController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) {}

    @Put('roles/:id/permissions')
    async syncPermissions(@Param('id') id: string, @Body() data: SyncPermissionsDto) {
        await this.rolePermissionService.syncRolePermissions(id, data.permissions);
        return { message: 'Permissions synced successfully' };
    }

    @Post('users/assign')
    async assignRoleToUser(@Body() data: AssignRoleDto) {
        return this.rolePermissionService.assignRoleToUser(data);
    }
}
