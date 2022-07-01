import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

export interface StoreAttibutes {
  id: number;
  userId: number;
  slug: string;
  name: string;
  country: string;
  description: string;
  slogan: string;
  address: string;
  type: string | null;
  keywords: string;
  phone: string;
  color: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreCreationAttributes
  extends Optional<StoreAttibutes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'tbl_stores',
})
export class Store extends Model<StoreAttibutes, StoreCreationAttributes> {
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  country: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  slogan: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type: string;

  @Column({
    type: DataType.STRING,
  })
  keywords: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  facebook: string;

  @Column({
    type: DataType.STRING,
  })
  twitter: string;

  @Column({
    type: DataType.STRING,
  })
  instagram: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logoUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bannerUrl: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
