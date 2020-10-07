import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas';
import { Model, Types } from 'mongoose';
import { NotificationDto } from './dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  /**
   * Finds all notifications for given user.
   * @param id Id of the user to find notifications for.
   * @param language 'ru' for russian localization and 'en' for english.
   */
  async findByUser(id: string, language: string): Promise<NotificationDto[]> {
    return this.notificationModel
      .aggregate<NotificationDto>([
        {
          $match: {
            $or: [{ to: new Types.ObjectId(id) }, { to: null }],
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
            message: language == 'ru' ? '$messageRu' : '$message',
            date: 1,
          },
        },
      ])
      .exec();
  }
}
