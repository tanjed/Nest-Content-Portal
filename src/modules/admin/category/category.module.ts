import { Module } from '@nestjs/common';
import { CategoryServiceModule } from './service/category.service.module';
import { CategoryAdminController } from './controller/category.admin.controller';
import { JwtModule } from '@/shared/jwt/jwt.module';
import { UserServiceModule } from '../user/service/user.service.module';

@Module({
  imports: [
    CategoryServiceModule,
    JwtModule,
    UserServiceModule,
  ],
  controllers: [CategoryAdminController],
})
export class CategoryModule { }
