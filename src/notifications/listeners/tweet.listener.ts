import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from 'src/users/services/user.service';
import { NotificationCreateEvent } from '../dto/create-notification.dto';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class TweetListener {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UserService,
  ) {}

  @OnEvent('tweet.like')
  async handleOrderCreatedEvent(event: NotificationCreateEvent) {
    if (!event.toUserId && !event.toUserId) {
      throw new Error('Error create tweet.like event');
    }
    const { username } = await this.usersService.findAccountByUserID(
      event.fromUserId,
    );

    this.notificationsService.create({
      ...event,
      title: 'New like',
      body: `${username || 'User'} liked your tweet.`,
    });
  }
}
