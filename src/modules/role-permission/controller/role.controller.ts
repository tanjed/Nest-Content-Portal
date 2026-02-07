import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import type { RolePermissionServiceInterface } from '../service/role-permission.service.interface';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from '../service/role-permission.service.interface';

@Controller('admin/roles')
export class RoleController {
    constructor(
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) {}

    @Post()
    async create(@Body() data: CreateRoleDto) {
        return this.rolePermissionService.createRole(data);
    }

    @Get()
    async findAll() {
        return this.rolePermissionService.getRoles();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.rolePermissionService.getRoleById(id);
    }
}
