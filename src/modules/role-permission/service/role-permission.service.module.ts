import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../user/entities/user.entity';
import { UserModule } from '../../../user/user.module';
import { Permission } from '../entity/permission.entity';
import { Role } from '../entity/role.entity';
import { PERMISSION_REPOSITORY_INTERFACE, PermissionRepository } from '../repository/permission.repository';
import { ROLE_REPOSITORY_INTERFACE, RoleRepository } from '../repository/role.repository';
import { RolePermissionService } from './role-permission.service';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from './role-permission.service.interface';
import { UserServiceModule } from '../../../user/service/user.service.module';

@Module({
    imports: [
        UserServiceModule,
        TypeOrmModule.forFeature([Role, Permission, User]),
    ],
    providers: [
        RoleRepository,
        {
            provide: ROLE_REPOSITORY_INTERFACE,
            useExisting: RoleRepository,
        },
        PermissionRepository,
        {
            provide: PERMISSION_REPOSITORY_INTERFACE,
            useExisting: PermissionRepository,
        },
        {
            provide: ROLE_PERMISSION_SERVICE_INTERFACE,
            useClass: RolePermissionService,
        },
    ],
    exports: [ROLE_PERMISSION_SERVICE_INTERFACE, PERMISSION_REPOSITORY_INTERFACE],
})
export class RolePermissionServiceModule {}
