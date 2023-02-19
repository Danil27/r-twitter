import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Hashtags } from './hashtags.entity';
import { Tweets } from '../../tweets/entities/tweets.entity';

@Table
export class HashtagsTweets extends Model {
  @ForeignKey(() => Hashtags)
  @Column({ field: 'hashtag_id' })
  hashtagId: number;

  @ForeignKey(() => Tweets)
  @Column({ field: 'tweet_id' })
  tweetId: number;
}
