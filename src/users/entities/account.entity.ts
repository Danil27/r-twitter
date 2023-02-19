import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './user.entity';

@Table
export class Accounts extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

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
