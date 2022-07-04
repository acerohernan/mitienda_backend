import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductVariant } from './variant.model';

export interface ProductVariantOptionsAttibutes {
  id: number;
  variantId: number;
  title: string;
  show: boolean;
  price: string;
}

export interface ProductVariantOptionsCreationAttributes
  extends Optional<ProductVariantOptionsAttibutes, 'id'> {}

@Table({
  tableName: 'tbl_products_variants_options',
})
export class ProductVariantOptions extends Model<
  ProductVariantOptionsAttibutes,
  ProductVariantOptionsCreationAttributes
> {
  @ForeignKey(() => ProductVariant)
  @Column(DataType.INTEGER)
  variantId: number;

  @Column(DataType.STRING)
  title: string;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  show: boolean;

  @Column(DataType.STRING)
  price: string;
}
