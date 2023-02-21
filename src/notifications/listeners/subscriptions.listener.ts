import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from '../../users/services/user.service';
import { NotificationCreateEvent } from '../dto/create-notification.dto';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class SubscriptionsListener {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UserService,
  ) {}

  @OnEvent('subscriptions.subscribe')
  async handleSubscribeEvent(event: NotificationCreateEvent) {
    if (!event.toUserId) {
      throw new Error('Error create subscriptions.subscribe event');
    }
    const { username } = await this.usersService.findAccountByUserID(
      event.fromUserId,
    );

    this.notificationsService.create({
      ...event,
      title: `New subscriber`,
      body: `User ${username || ''} subscribe to you!`,
    });
  }
}
