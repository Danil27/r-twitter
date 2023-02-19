import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { Hashtags } from 'src/hashtags/entities/hashtags.entity';
import { Users } from '../../users/entities/user.entity';
import { HashtagsTweets } from '../../hashtags/entities/hashtags_tweets.entity';

@Table
export class Tweets extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  body: string;

  @ForeignKey(() => Users)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsToMany(() => Hashtags, () => HashtagsTweets)
  hashtags: Hashtags[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', allowNull: true })
  deletedAt: Date;
}
