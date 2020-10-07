import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { CategoryDto } from '../categories/dto';
import { CategoryLoaders } from '../categories/category.loaders';
import { CategoryArgs, ProductArgs } from './args';
import { FilterProductsDto } from './dto';

@Resolver('Product')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryLoaders: CategoryLoaders,
  ) {}

  @Query('product')
  async getProduct(@Args() args: ProductArgs): Promise<ProductDto> {
    return this.productsService.findById(args.id, args.language);
  }

  @Query('products')
  async getProducts(
    @Args('filter') filter: FilterProductsDto,
    @Args('language') language: string,
  ): Promise<ProductDto[]> {
    return this.productsService.findMany(
      filter && filter.category,
      filter && filter.name,
      language,
    );
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
