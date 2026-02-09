import { Body, Controller, Inject, Param, Put, UseGuards } from '@nestjs/common';
import { SyncPermissionsDto } from '../dto/sync-permissions.dto';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';
import { PERMISSIONS } from '../constants/permissions';
import { Can } from 'src/shared/decorator/permissions.decorator';
import { AuthenticateGuard } from 'src/shared/guard/authenticate.guard';
import { AuthorizeGuard } from 'src/shared/guard/authorize.guard';

@Controller('admin/role-permissions')
@UseGuards(AuthenticateGuard)
@UseGuards(AuthorizeGuard)
export class RolePermissionController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) { }

    @Put('roles/:id/permissions')
    @Can(PERMISSIONS.ROLE.UPDATE)
    async syncPermissions(@Param('id') id: string, @Body() data: SyncPermissionsDto) {
        await this.rolePermissionService.syncRolePermissions(id, data.permissions);
        return { message: 'Permissions synced successfully' };
    }
}
