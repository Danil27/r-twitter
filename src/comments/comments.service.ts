import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
