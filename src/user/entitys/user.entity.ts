import {
  Table,
  Column,
  Model,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { Gender } from '../enums/gender.enum';

@Table
export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column({
    type: DataType.ENUM(Gender.MAN, Gender.WOMAN, Gender.OTHER),
  })
  gender: Gender;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', allowNull: true })
  deleted_at: Date;
}
