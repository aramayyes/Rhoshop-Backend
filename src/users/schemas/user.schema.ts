import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 30 })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
