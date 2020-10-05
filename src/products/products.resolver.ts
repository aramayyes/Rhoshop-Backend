import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { CategoryDto } from '../categories/dto/category.dto';
import { CategoryLoaders } from '../categories/category.loaders';
import { ProductArgs, ProductsArgs, CategoryArgs } from './args';

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
  async getProducts(@Args() args: ProductsArgs): Promise<ProductDto[]> {
    return this.productsService.findMany(args.category, args.language);
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
