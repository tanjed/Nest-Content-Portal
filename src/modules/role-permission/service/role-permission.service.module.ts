import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { Permission } from '../entity/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ROLE_PERMISSION_SERVICE_INTERFACE } from './role-permission.service.interface';
import { RolePermissionService } from './role-permission.service';
import { ROLE_REPOSITORY_INTERFACE } from '../repository/role.repository';
import { RoleRepository } from '../repository/role.repository';
import { PERMISSION_REPOSITORY_INTERFACE } from '../repository/permission.repository';
import { PermissionRepository } from '../repository/permission.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { USER_REPOSITORY_INTERFACE } from 'src/modules/user/repository/user.repository.interface';

@Module({
    imports: [
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
        UserRepository,
        {
            provide: USER_REPOSITORY_INTERFACE,
            useExisting: UserRepository,
        },
        {
            provide: ROLE_PERMISSION_SERVICE_INTERFACE,
            useClass: RolePermissionService,
        },
    ],
    exports: [ROLE_PERMISSION_SERVICE_INTERFACE],
})
export class RolePermissionServiceModule {}
