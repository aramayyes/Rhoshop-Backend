import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from './dto';
import { GqlJwtAuthGuard } from '../auth/guards';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../current-user.decorator';
import { ProductsService } from '../products/products.service';
import { UserInputError } from 'apollo-server-express';
import { ProductArgs } from './args';
import { ProductDto } from '../products/dto';
import { ProductLoaders } from '../products/product.loaders';

@Resolver('Order')
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly productLoaders: ProductLoaders,
  ) {}

  @Mutation('createOrder')
  @UseGuards(GqlJwtAuthGuard)
  async createOrder(
    @Args('createOrderInput') orderInput: CreateOrderDto,
    @CurrentUser() user: { id: string; email: string },
  ): Promise<OrderDto> {
    if (!(await this.productsService.exists(orderInput.product))) {
      throw new UserInputError('Invalid product!');
    }
    return this.ordersService.create(user.id, orderInput);
  }

  @Query('orders')
  @UseGuards(GqlJwtAuthGuard)
  async getOrders(
    @CurrentUser() user: { id: string; email: string },
  ): Promise<OrderDto[]> {
    return this.ordersService.findMany(user.id);
  }

  @ResolveField('product')
  async product(
    @Parent() order,
    @Args() args: ProductArgs,
  ): Promise<ProductDto> {
    return this.productLoaders.findByIds.load({
      id: order.product.toString(),
      language: args.language,
    });
  }
}
