import { Order } from '../../graphql';
import { Order as DbOrder } from '../schemas';

export class OrderDto extends Order {
  constructor(dbOrder: DbOrder) {
    super();

    this.id = dbOrder.id;
    this.date = dbOrder.date;
    this.product = <any>dbOrder.product;
    this.productSize = dbOrder.productSize;
    this.productColor = dbOrder.productColor;
    this.productCount = dbOrder.productCount;
  }
}
