import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';

export interface ProductVariantAttibutes {
  id: number;
  productId: number;
  title: string;
  optional: boolean;
  toSelect: number;
}

export interface ProductVariantCreationAttributes
  extends Optional<ProductVariantAttibutes, 'id'> {}

@Table({
  tableName: 'tbl_products_variants',
})
export class ProductVariant extends Model<
  ProductVariantAttibutes,
  ProductVariantCreationAttributes
> {
  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;

  @Column(DataType.STRING)
  title: string;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  optional: boolean;

  @Column(DataType.INTEGER)
  toSelect: number;
}
