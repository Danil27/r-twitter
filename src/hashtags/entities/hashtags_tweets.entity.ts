import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tweets } from '../../tweets/entities/tweets.entity';
import { Hashtags } from './hashtags.entity';

@Table
export class HashtagsTweets extends Model {
  @ForeignKey(() => Hashtags)
  @Column({ field: 'hashtag_id' })
  hashtagId: number;

  @ForeignKey(() => Tweets)
  @Column({ field: 'tweet_id' })
  tweetId: number;

  @BelongsTo(() => Hashtags)
  hashtag: Hashtags;
}
