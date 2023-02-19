import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
  ForeignKey,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from '../../users/entities/user.entity';

@Table
export class Hashtags extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => Users)
  @Column({ field: 'user_id' })
  userId: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
