import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Users',
    required: true,
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Products',
    required: true,
  })
  product: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    maxlength: 4,
    type: MongooseSchema.Types.String,
    enum: ['S', 'M', 'L', 'XL'],
  })
  productSize: string;

  @Prop({
    required: true,
    minlength: '6',
    maxlength: '6',
  })
  productColor: string;

  @Prop({
    required: true,
    min: 1,
    type: MongooseSchema.Types.Number,
    validate: {
      validator: Number.isInteger,
      message: props => `${props.value} is not an integer value!`,
    },
  })
  count: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
