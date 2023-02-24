import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { NotificationCreateEvent } from './dto/create-notification.dto';
import { Notifications } from './notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NotificationsRepository')
    private readonly notificationsRepository: typeof Notifications,
  ) {}

  public async create(data: NotificationCreateEvent) {
    return this.notificationsRepository.create(data);
  }

  public async findNotifications(userId: number) {
    return this.notificationsRepository.findAll<Notifications>({
      where: {
        [Op.and]: [{ toUserId: userId }, { isRead: false }],
      },
    });
  }

  public async readNotification(userId: number, notificationId: number) {
    const notification = await this.notificationsRepository.findOne({
      where: {
        id: notificationId,
        isRead: false,
      },
    });

    if (!notification || notification.toUserId !== userId) {
      throw new HttpException(
        'Notification not found.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.notificationsRepository.update(
      { isRead: true },
      {
        where: {
          id: notificationId,
        },
      },
    );

    return true;
  }
}
