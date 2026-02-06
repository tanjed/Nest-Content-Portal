import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from '../entity/sub-category.entity';
import { SUB_CATEGORY_SERVICE_INTERFACE } from './sub-category.service.interface';
import { SubCategoryService } from './sub-category.service';
import { SUB_CATEGORY_REPOSITORY_INTERFACE } from '../repository/sub-category.repository.interface';
import { SubCategoryRepository } from '../repository/sub-category.repository';
import { CATEGORY_REPOSITORY_INTERFACE } from 'src/modules/category/repository/category.repository';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
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
    {
      provide: CATEGORY_REPOSITORY_INTERFACE,
      useClass: CategoryRepository,
    },
  ],
  exports: [SUB_CATEGORY_SERVICE_INTERFACE, TypeOrmModule],
})
export class SubCategoryServiceModule {}
