import { Module } from '@nestjs/common';
import { SubCategoryServiceModule } from './service/sub-category.service.module';
import { SubCategoryAdminController } from './controller/sub-category.admin.controller';

@Module({
  imports: [SubCategoryServiceModule],
  controllers: [SubCategoryAdminController],
})
export class SubCategoryModule {}
