import { ProductCreationAttributes } from '../models/product/product.model';
import { ProductVariantCreationAttributes } from '../models/product/variant.model';
import { ProductVariantOptionCreationAttributes } from '../models/product/variantOptions.model';

export interface ICategoryWithProducts {
  category: string;
  products: IProduct[];
}

export interface IProduct extends ProductCreationAttributes {
  variants: IProductVariant[];
}

export interface IProductVariant extends ProductVariantCreationAttributes {
  options: IProductVariantOption[];
}

export interface IProductVariantOption
  extends ProductVariantOptionCreationAttributes {}
