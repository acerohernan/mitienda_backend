import { IProductVariant } from '../interfaces/product.interface';
import { Product } from '../models/product/product.model';
import { ProductVariant } from '../models/product/variant.model';
import { ProductVariantOption } from '../models/product/variantOptions.model';

export async function getFullProductById(id: number) {
  let variants: IProductVariant[] = [];

  const product = await Product.findOne({ where: { id }, raw: true });

  if (!product) return null;

  const variantsDB = await ProductVariant.findAll({
    where: { productId: product?.id },
    raw: true,
  });

  if (!!variantsDB.length) {
    variantsDB.forEach(async (variant) => {
      const options = await ProductVariantOption.findAll({
        where: { variantId: variant.id },
      });

      variants.push({
        ...variant,
        options,
      });
    });
  }

  return {
    ...product,
    variants,
  };
}
