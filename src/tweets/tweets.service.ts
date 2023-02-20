import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Hashtags } from '../hashtags/entities/hashtags.entity';
import { HashtagsService } from '../hashtags/hashtags.service';
import { Users } from '../users/entities/user.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagsTweets } from '../hashtags/entities/hashtags_tweets.entity';
import { Tweets } from './entities/tweets.entity';
import { Op } from 'sequelize';
import { Likes } from '../likes/likes.entity';
import { Comments } from '../comments/comments.entity';

@Injectable()
export class TweetsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('TweetsRepository')
    private readonly tweetsRepository: typeof Tweets,
    @Inject('HashtagsTweetsRepository')
    private readonly hashtagsTweetsRepository: typeof HashtagsTweets,
    private readonly hashtagsService: HashtagsService,
  ) {}

  public async getTweets(offset = 0) {
    return await this.tweetsRepository.findAll({
      limit: 10,
      offset: offset,
      order: [['createdAt', 'DESC']],
      include: [Hashtags, Likes, Users, Comments],
    });
  }

  public async create(userId: number, data: CreateTweetDto) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const { hashtags, title, body } = data;
    const hashtagsTweets = [];

    const tweet = await this.tweetsRepository.create({
      title,
      body,
      userId,
    });

    for (const hashtag of hashtags) {
      hashtagsTweets.push({
        hashtagId: (await this.hashtagsService.findOrCreate(hashtag, userId))
          .id,
        tweetId: tweet.id,
      });
    }

    this.hashtagsTweetsRepository.bulkCreate(hashtagsTweets);

    return tweet;
  }

  public async findById(id: number) {
    return await this.tweetsRepository.findByPk<Tweets>(id, {
      include: [Hashtags, Likes, Users, Comments],
    });
  }

  public async searchByTitle(title: string) {
    return await this.tweetsRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  }

  public async searchByHashtag(title: string) {
    const hashtagIds = (await this.hashtagsService.searchByTitle(title)).map(
      (h) => h.dataValues.id,
    );

    const twitIds = (
      await this.hashtagsTweetsRepository.findAll({
        attributes: ['tweetId'],
        where: {
          hashtagId: hashtagIds,
        },
      })
    ).map((t) => t.dataValues.tweetId);

    return (
      await this.tweetsRepository.findAll({
        include: [Hashtags],
        where: {
          id: twitIds,
        },
      })
    ).map((twit) => twit.dataValues);
  }
}
