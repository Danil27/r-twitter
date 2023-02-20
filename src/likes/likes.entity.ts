import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
  ForeignKey,
  UpdatedAt,
} from 'sequelize-typescript';
import { Tweets } from '../tweets/entities/tweets.entity';
import { Users } from '../users/entities/user.entity';

@Table
export class Likes extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Tweets)
  @Column({ field: 'tweet_id' })
  tweetId: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
