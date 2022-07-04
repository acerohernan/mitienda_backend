import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Store } from '../store/store.model';

export interface CategoryAttibutes {
  id: number;
  storeId: number;
  name: string;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttibutes, 'id'> {}

@Table({
  tableName: 'tbl_categories',
})
export class Category extends Model<
  CategoryAttibutes,
  CategoryCreationAttributes
> {
  @ForeignKey(() => Store)
  @Column(DataType.INTEGER)
  storeId: number;

  @Column(DataType.STRING)
  name: string;
}
