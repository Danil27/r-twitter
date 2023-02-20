import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Tweets } from '../tweets/entities/tweets.entity';
import { Users } from '../users/entities/user.entity';
import { Likes } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @Inject('LikesRepository')
    private readonly likesRepository: typeof Likes,
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('TweetsRepository')
    private readonly tweetsRepository: typeof Tweets,
  ) {}

  public async like(userId: number, tweetId: number) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    const tweet = await this.tweetsRepository.findByPk<Tweets>(tweetId);
    if (!tweet) {
      throw new HttpException('Tweet not found.', HttpStatus.NOT_FOUND);
    }

    const like = await this.likesRepository.findOne<Likes>({
      where: {
        [Op.and]: [{ userId }, { tweetId }],
      },
    });

    if (like) {
      this.likesRepository.destroy({
        where: {
          [Op.and]: [{ userId }, { tweetId }],
        },
      });
      return false;
    }

    this.likesRepository.create({
      userId,
      tweetId,
    });

    return true;
  }

  public async isLike(userId: number, tweetId: number) {
    const like = await this.likesRepository.findOne<Likes>({
      where: {
        [Op.and]: [{ userId }, { tweetId }],
      },
    });

    if (like) {
      return true;
    }

    return false;
  }
}
