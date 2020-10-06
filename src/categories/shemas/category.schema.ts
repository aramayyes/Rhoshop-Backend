import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 100 })
  nameRu: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: 0 })
  order: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
