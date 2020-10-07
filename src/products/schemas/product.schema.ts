import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 100 })
  nameRu: string;

  @Prop({ required: true, maxlength: 1000 })
  description: string;

  @Prop({ required: true, maxlength: 1000 })
  descriptionRu: string;

  @Prop({ required: true })
  image: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  })
  category: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0 })
  oldPrice: number;

  // These fields are hardcoded, but should be calculated.
  @Prop({ required: true, min: 0 })
  rating: number;

  @Prop({ required: true, default: 0, min: 0 })
  reviewsCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
