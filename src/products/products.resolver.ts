import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { CategoryDto } from '../categories/dto/category.dto';
import { CategoryLoaders } from '../categories/category.loaders';

@Resolver('Product')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryLoaders: CategoryLoaders,
  ) {}

  @Query('product')
  async getProduct(
    @Args('id') id: string,
    @Args('language') language: string,
  ): Promise<ProductDto> {
    return this.productsService.findById(id, language);
  }

  @Query('products')
  async getProducts(
    @Args('category') category: string,
    @Args('language') language: string,
  ): Promise<ProductDto[]> {
    return this.productsService.findMany(category, language);
  }

  @ResolveField('category')
  async category(
    @Parent() product,
    @Args('language') language: string,
  ): Promise<CategoryDto> {
    return this.categoryLoaders.findByIds.load({
      id: product.category.toString(),
      language,
    });
  }
}
