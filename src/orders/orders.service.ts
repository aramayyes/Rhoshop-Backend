import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './schemas';
import { CreateOrderDto, OrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  /**
   * Finds orders of given user.
   * @param user Id of the user whose orders should be find.
   */
  async findMany(user: string): Promise<OrderDto[]> {
    return await this.orderModel
      .aggregate<OrderDto>([
        {
          $match: {
            user: new Types.ObjectId(user),
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            date: 1,
            product: 1,
            productSize: 1,
            productColor: 1,
            productCount: 1,
          },
        },
      ])
      .exec();
  }

  /**
   * Creates an order.
   * @param user Id of the user who the order should be created for.
   * @param orderPayload Contains order details.
   */
  async create(user: string, orderPayload: CreateOrderDto): Promise<OrderDto> {
    return new OrderDto(
      await this.orderModel.create({ user, date: new Date(), ...orderPayload }),
    );
  }
}
