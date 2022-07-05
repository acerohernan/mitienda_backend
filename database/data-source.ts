import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/product/category.model';
import { Product } from '../models/product/product.model';
import { ProductVariant } from '../models/product/variant.model';
import { ProductVariantOption } from '../models/product/variantOptions.model';
import { Store } from '../models/store/store.model';
import { User } from '../models/user/user.model';

export const sequelize = new Sequelize({
  database: config.get<string>('database.name'),
  dialect: config.get<'postgres'>('database.type'),
  username: config.get<string>('database.username'),
  password: config.get<string>('database.password'),
  host: config.get<string>('database.host'),
  models: [
    User,
    Store,
    Category,
    Product,
    ProductVariant,
    ProductVariantOption,
  ],
  storage: ':memory:',
  logging: false,
  dialectOptions: {
    /* ssl: {
      require: true,
      rejectUnauthorized: false,
    }, */
  },
});
