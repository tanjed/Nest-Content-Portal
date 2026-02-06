import { Module } from '@nestjs/common';
import { CategoryServiceModule } from './service/category.service.module';
import { CategoryAdminController } from './controller/category.admin.controller';

@Module({
  imports: [CategoryServiceModule],
  controllers: [CategoryAdminController],
})
export class CategoryModule {}
