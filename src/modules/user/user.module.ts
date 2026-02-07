import { Module } from '@nestjs/common';
import { JwtModule } from '../../shared/jwt/jwt.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { UserAuthController } from './controller/user-auth.controller';
import { UserController } from './controller/user.controller';
import { UserServiceModule } from './service/user.service.module';
import { RolePermissionServiceModule } from '../role-permission/service/role-permission.service.module';


@Module({
  imports:[UserServiceModule, JwtModule, RolePermissionServiceModule],
  controllers: [UserController, UserAuthController],
  providers: [],
})
export class UserModule {}
