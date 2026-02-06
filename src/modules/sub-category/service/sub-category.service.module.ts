import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from '../entity/sub-category.entity';
import { SUB_CATEGORY_SERVICE_INTERFACE } from './sub-category.service.interface';
import { SubCategoryService } from './sub-category.service';
import { SUB_CATEGORY_REPOSITORY_INTERFACE } from '../repository/sub-category.repository.interface';
import { SubCategoryRepository } from '../repository/sub-category.repository';
import { CATEGORY_REPOSITORY_INTERFACE } from 'src/modules/category/repository/category.repository';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { CategoryServiceModule } from 'src/modules/category/service/category.service.module';

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
