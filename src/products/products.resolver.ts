import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { CategoryDto } from '../categories/dto';
import { CategoryLoaders } from '../categories/category.loaders';
import { CategoryArgs, NewProductsArgs, ProductArgs } from './args';
import { FilterProductsDto } from './dto';
import { FeaturedProductsArgs } from './args/featured-products.args';

@Resolver('Product')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryLoaders: CategoryLoaders,
  ) {}

  @Query('products')
  async getProducts(
    @Args('filter') filter: FilterProductsDto,
    @Args('language') language: string,
  ): Promise<ProductDto[]> {
    return this.productsService.findMany(
      language,
      filter && filter.name,
      filter && filter.category,
      filter.ids,
    );
  }

  @Query('newProducts')
  async getNewProducts(@Args() args: NewProductsArgs): Promise<ProductDto[]> {
    return this.productsService.findRandom(args.count, args.language);
  }

  @Query('featuredProducts')
  async getFeatureProducts(
    @Args() args: FeaturedProductsArgs,
  ): Promise<ProductDto[]> {
    return this.productsService.findRandom(args.count, args.language);
  }

  @Query('product')
  async getProduct(@Args() args: ProductArgs): Promise<ProductDto> {
    return this.productsService.findById(args.id, args.language);
  }

  @ResolveField('category')
  async category(
    @Parent() product,
    @Args() args: CategoryArgs,
  ): Promise<CategoryDto> {
    return this.categoryLoaders.findByIds.load({
      id: product.category.toString(),
      language: args.language,
    });
  }
}
