import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserServiceModule } from './service/user.service.module';


@Module({
  imports:[UserServiceModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
