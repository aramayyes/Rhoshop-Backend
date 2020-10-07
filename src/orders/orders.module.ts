import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
