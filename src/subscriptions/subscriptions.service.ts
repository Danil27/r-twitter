import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Op } from 'sequelize';
import { NotificationCreateEvent } from '../notifications/dto/create-notification.dto';
import { NotificationsType } from '../notifications/enums/notifications-type.enum';
import { Users } from '../users/entities/user.entity';
import { Subscriptions } from './subscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('SubscriptionsRepository')
    private readonly subscriptionsRepository: typeof Subscriptions,
    private eventEmitter: EventEmitter2,
  ) {}

  public async subscribe(userId: number, authorId: number) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const author = await this.usersRepository.findByPk<Users>(authorId);
    if (!author) {
      throw new HttpException('Author not found.', HttpStatus.NOT_FOUND);
    }

    this.subscriptionsRepository.create({
      subscriberId: userId,
      userId: authorId,
    });

    this.eventEmitter.emit('subscriptions.subscribe', {
      type: NotificationsType.COMMENT,
      fromUserId: userId,
      toUserId: authorId,
    } as NotificationCreateEvent);

    return true;
  }
  public async unsubscribe(userId: number, authorId: number) {
    if (userId === authorId) {
      throw new HttpException('Error subscribe.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    const author = await this.usersRepository.findByPk<Users>(authorId);
    if (!author) {
      throw new HttpException('Author not found.', HttpStatus.BAD_REQUEST);
    }

    const sub = await this.subscriptionsRepository.findOne({
      where: {
        [Op.and]: [{ userId: authorId }, { subscriberId: userId }],
      },
    });

    if (!sub) {
      throw new HttpException(
        'You are not subscribed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.subscriptionsRepository.destroy({
      where: {
        id: sub.id,
      },
    });

    return true;
  }

  public async getSubscriptions(subscriberId: number) {
    const authorIds = await this.subscriptionsRepository.findAll<Subscriptions>(
      {
        attributes: ['userId'],
        where: {
          subscriberId,
        },
      },
    );

    return this.usersRepository.findAll({
      where: { id: authorIds.map((s) => s.userId) },
    });
  }

  public async getSubscribers(userId: number) {
    const subscribers =
      await this.subscriptionsRepository.findAll<Subscriptions>({
        attributes: ['subscriberId'],
        where: {
          userId,
        },
      });

    return this.usersRepository.findAll({
      where: { id: subscribers.map((s) => s.subscriberId) },
    });
  }
}
