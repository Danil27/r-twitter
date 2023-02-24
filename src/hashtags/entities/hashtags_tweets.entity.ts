import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
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

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
