import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from '../../users/services/user.service';
import { NotificationCreateEvent } from '../dto/create-notification.dto';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class SystemListener {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UserService,
  ) {}

  @OnEvent('system.register')
  async handleRegisterEvent(event: NotificationCreateEvent) {
    if (!event.toUserId) {
      throw new Error('Error create system.register event');
    }
    const { username } = await this.usersService.findAccountByUserID(
      event.toUserId,
    );

    this.notificationsService.create({
      ...event,
      title: `Hi, ${username || 'friend'}!`,
      body: `Welcome to r-twitter app!`,
    });
  }
}
