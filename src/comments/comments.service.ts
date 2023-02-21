import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationCreateEvent } from '../notifications/dto/create-notification.dto';
import { NotificationsType } from '../notifications/enums/notifications-type.enum';
import { Tweets } from '../tweets/entities/tweets.entity';
import { Users } from '../users/entities/user.entity';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('TweetsRepository')
    private readonly tweetsRepository: typeof Tweets,
    @Inject('CommentsRepository')
    private readonly commentsRepository: typeof Comments,
    private eventEmitter: EventEmitter2,
  ) {}

  public async create(userId: number, tweetId: number, comment: string) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    const tweet = await this.tweetsRepository.findByPk<Tweets>(tweetId);
    if (!tweet) {
      throw new HttpException('Tweet not found.', HttpStatus.NOT_FOUND);
    }

    this.commentsRepository.create({
      userId,
      tweetId,
      comment,
    });

    this.eventEmitter.emit('tweet.comment', {
      type: NotificationsType.COMMENT,
      fromUserId: userId,
      toUserId: tweet.userId,
    } as NotificationCreateEvent);

    return true;
  }

  public async delete(userId: number, commentId: number) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const comment = await this.commentsRepository.findByPk<Comments>(commentId);
    if (comment && comment.userId == userId) {
      this.commentsRepository.destroy({
        where: {
          id: comment.id,
        },
      });

      return true;
    } else {
      throw new HttpException('Error delete comment.', HttpStatus.BAD_REQUEST);
    }
  }
}
