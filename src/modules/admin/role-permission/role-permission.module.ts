import { Module } from '@nestjs/common';
import { RolePermissionServiceModule } from './service/role-permission.service.module';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { RolePermissionController } from './controller/role-permission.controller';
import { JwtModule } from '@/shared/jwt/jwt.module';
import { UserServiceModule } from '../user/service/user.service.module';

export const DEFAULT_ROLE = 'SUPER_ADMIN';

@Module({
    imports: [
        RolePermissionServiceModule,
        JwtModule,
        UserServiceModule,
    ],
    controllers: [RoleController, PermissionController, RolePermissionController],
    exports: [],
})
export class RolePermissionModule { }
