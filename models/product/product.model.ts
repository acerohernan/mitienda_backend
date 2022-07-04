import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Store } from '../store/store.model';
import { Category } from './category.model';

export interface ProductAttibutes {
  id: number;
  storeId: number;
  categoryId: number;
  name: string;
  description: string;
  type: number;
  imgUrl?: string;
  price: string;
  top: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttibutes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'tbl_products',
})
export class Product extends Model<
  ProductAttibutes,
  ProductCreationAttributes
> {
  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId: number;

  @ForeignKey(() => Store)
  @Column(DataType.INTEGER)
  storeId: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    defaultValue: null,
  })
  imgUrl: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.INTEGER)
  type: number;

  @Column(DataType.STRING)
  price: string;

  @Column(DataType.BOOLEAN)
  top: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
