import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from '../users/entities/user.entity';
import { NotificationsType } from './enums/notifications-type.enum';

@Table
export class Notifications extends Model {
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

  @Column({
    type: DataType.ENUM(
      NotificationsType.COMMENT,
      NotificationsType.LIKE,
      NotificationsType.SUBSCRIPTIONS,
      NotificationsType.SYSTEM,
    ),
  })
  type: NotificationsType;

  @Column({ field: 'is_read', defaultValue: false })
  isRead: boolean;

  @ForeignKey(() => Users)
  @Column({ field: 'from_user_id' })
  fromUserId: number;

  @ForeignKey(() => Users)
  @Column({ field: 'to_user_id' })
  toUserId: number;

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
