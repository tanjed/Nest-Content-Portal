import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryServiceModule } from '../../category/service/category.service.module';
import { SubCategory } from '../entity/sub-category.entity';
import { SubCategoryRepository } from '../repository/sub-category.repository';
import { SUB_CATEGORY_REPOSITORY_INTERFACE } from '../repository/sub-category.repository.interface';
import { SubCategoryService } from './sub-category.service';
import { SUB_CATEGORY_SERVICE_INTERFACE } from './sub-category.service.interface';

@Module({
  imports: [CategoryServiceModule, TypeOrmModule.forFeature([SubCategory])],
  providers: [
    SubCategoryRepository,
    {
      provide: SUB_CATEGORY_SERVICE_INTERFACE,
      useClass: SubCategoryService,
    },
    {
      provide: SUB_CATEGORY_REPOSITORY_INTERFACE,
      useExisting: SubCategoryRepository,
    },
  ],
  exports: [SUB_CATEGORY_SERVICE_INTERFACE],
})
export class SubCategoryServiceModule {}
