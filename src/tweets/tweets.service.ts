import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { Users } from '../users/entities/user.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagsTweets } from './entities/hashtags_tweets.entity';
import { Tweets } from './entities/tweets.entity';

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

    return undefined;
  }
}
