import { Args, Query, Resolver } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from './dto';
import { NotificationsArgs } from './args';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../current-user.decorator';

@Resolver()
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query('notifications')
  @UseGuards(GqlJwtAuthGuard)
  async getNotifications(
    @Args() args: NotificationsArgs,
    @CurrentUser() user: { id: string; email: string },
  ): Promise<NotificationDto[]> {
    return this.notificationsService.findByUser(user.id, args.language);
  }
}
