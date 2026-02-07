import { Module } from '@nestjs/common';
import { RolePermissionServiceModule } from './service/role-permission.service.module';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { RolePermissionController } from './controller/role-permission.controller';

export const DEFAULT_ROLE = 'SUPER_ADMIN';

@Module({
    imports: [RolePermissionServiceModule],
    controllers: [RoleController, PermissionController, RolePermissionController],
    exports: [],
})
export class RolePermissionModule {}
