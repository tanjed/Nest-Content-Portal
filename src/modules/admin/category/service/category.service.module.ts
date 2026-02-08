import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { CATEGORY_SERVICE_INTERFACE } from './category.service.interface';
import { CategoryService } from './category.service';
import { CATEGORY_REPOSITORY_INTERFACE } from '../repository/category.repository.interface';
import { CategoryRepository } from '../repository/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryRepository,
    {
      provide: CATEGORY_SERVICE_INTERFACE,
      useClass: CategoryService,
    },
    {
      provide: CATEGORY_REPOSITORY_INTERFACE,
      useExisting: CategoryRepository,
    },
  ],
  exports: [CATEGORY_SERVICE_INTERFACE],
})
export class CategoryServiceModule {}
