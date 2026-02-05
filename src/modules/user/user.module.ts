import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserServiceModule } from './service/user.service.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';


@Module({
  imports:[UserServiceModule, JwtModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
