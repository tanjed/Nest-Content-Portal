import { Module } from '@nestjs/common';
import { SubCategoryServiceModule } from './service/sub-category.service.module';
import { SubCategoryAdminController } from './controller/sub-category.admin.controller';
import { JwtModule } from '@/shared/jwt/jwt.module';
import { UserServiceModule } from '../user/service/user.service.module';

@Module({
  imports: [
    SubCategoryServiceModule,
    JwtModule,
    UserServiceModule,
  ],
  controllers: [SubCategoryAdminController],
})
export class SubCategoryModule { }
