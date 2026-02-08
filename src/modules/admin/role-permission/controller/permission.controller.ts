import { Controller, Get, Inject } from '@nestjs/common';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';
import { PERMISSIONS } from '../constants/permissions';
import { Can } from 'src/shared/decorator/permissions.decorator';
import { AuthenticateGuard } from 'src/shared/guard/authenticate.guard';
import { AuthorizeGuard } from 'src/shared/guard/authorize.guard';
import { UseGuards } from '@nestjs/common';

@Controller('admin/permissions')
@UseGuards(AuthenticateGuard)
@UseGuards(AuthorizeGuard)
export class PermissionController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) {}

    @Get()
    @Can(PERMISSIONS.ROLE.VIEW)
    async findAll() {
        return this.rolePermissionService.getPermissions();
    }
}
