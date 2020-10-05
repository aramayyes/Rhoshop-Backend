import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './shemas';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoryLoaders } from './category.loaders';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesService, CategoriesResolver, CategoryLoaders],
  exports: [CategoriesService, CategoryLoaders],
})
export class CategoriesModule {}
