import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { CategoriesModule } from '../categories/categories.module';
import { ProductLoaders } from './product.loaders';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoriesModule,
  ],
  providers: [ProductsService, ProductsResolver, ProductLoaders],
  exports: [ProductsService, ProductLoaders],
})
export class ProductsModule {}
