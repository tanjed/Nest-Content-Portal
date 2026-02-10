import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';
import { PERMISSIONS } from '../constants/permissions';
import { Can } from '../../../../shared/decorator/permissions.decorator';
import { AuthenticateGuard } from '../../../../shared/guard/authenticate.guard';
import { AuthorizeGuard } from '../../../../shared/guard/authorize.guard';

@Controller('admin/roles')
@UseGuards(AuthenticateGuard, AuthorizeGuard)
export class RoleController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) { }

    @Post()
    @Can(PERMISSIONS.ROLE.CREATE)
    async create(@Body() data: CreateRoleDto) {
        return this.rolePermissionService.createRole(data);
    }

    @Get()
    @Can(PERMISSIONS.ROLE.VIEW)
    async findAll() {
        return this.rolePermissionService.getRoles();
    }

    @Get(':id')
    @Can(PERMISSIONS.ROLE.VIEW)
    async findOne(@Param('id') id: string) {
        return this.rolePermissionService.getRoleById(id);
    }
}
