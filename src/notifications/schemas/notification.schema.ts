import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Notification extends Document {
  // If this value is not provided, then this notification will be sent to all users.
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  to: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, maxlength: 600 })
  message: string;

  @Prop({ required: true, maxlength: 600 })
  messageRu: string;

  @Prop({ required: true })
  date: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
