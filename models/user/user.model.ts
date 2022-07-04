import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Index,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

export interface UserAttibutes {
  id: number;
  email: string;
  password: string;
  status?: number;
  verifyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttibutes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'tbl_users',
})
export class User extends Model<UserAttibutes, UserCreationAttributes> {
  @Index
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  status: number;

  @Column({
    type: DataType.STRING,
  })
  verifyCode: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
