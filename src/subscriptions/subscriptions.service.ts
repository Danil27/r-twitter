import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Users } from '../users/entities/user.entity';
import { Subscriptions } from './subscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('SubscriptionsRepository')
    private readonly subscriptionsRepository: typeof Subscriptions,
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

    return true;
  }
  public async unsubscribe(userId: number, authorId: number) {
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
}
