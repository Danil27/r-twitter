import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
  ForeignKey,
  UpdatedAt,
  HasMany,
  BelongsToMany,
  HasOne,
  BelongsTo,
  BelongsToManyAssociation,
} from 'sequelize-typescript';
import { Users } from '../users/entities/user.entity';

@Table
export class Subscriptions extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Users)
  @Column({ field: 'subscriber_id' })
  subscriberId: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
