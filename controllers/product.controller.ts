import { Request, Response } from 'express';
import {
  ICategoryWithProducts,
  IProduct,
} from '../interfaces/product.interface';
import {
  Category,
  CategoryCreationAttributes,
} from '../models/product/category.model';
import {
  Product,
  ProductAttibutes,
  ProductCreationAttributes,
} from '../models/product/product.model';
import {
  ProductVariant,
  ProductVariantCreationAttributes,
} from '../models/product/variant.model';
import {
  ProductVariantOption,
  ProductVariantOptionCreationAttributes,
} from '../models/product/variantOptions.model';
import { Store } from '../models/store/store.model';
import { getFullProductById } from '../services/product.service';
import logger from '../utils/logger';

interface IVariantToSave extends ProductVariantCreationAttributes {
  options: ProductVariantOption[];
}

export async function getProductsHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;

    const store = await Store.findOne({
      where: {
        slug: user.store,
      },
      raw: true,
    });

    if (!store)
      res.status(400).json({
        message: 'Store not found',
        success: false,
      });

    //Variables
    let allProductsByCategory: ICategoryWithProducts[] = [];
    let categoriesDB;
    let productsDB;

    //Search all categories
    categoriesDB = await Category.findAll({
      where: {
        storeId: store?.id,
      },
      raw: true,
    });

    //Search the products for each category
    for (let i = 0; i < categoriesDB.length; i++) {
      let category = categoriesDB[i];
      let allProducts: IProduct[] = [];

      //Search all the products
      productsDB = await Product.findAll({
        where: {
          categoryId: category.id,
        },
        raw: true,
      });

      for (let i = 0; i < productsDB.length; i++) {
        const fullProduct = await getFullProductById(productsDB[i].id);

        if (!fullProduct) return;

        allProducts = [...allProducts, fullProduct];
      }

      //Get product's variants

      allProductsByCategory = [
        ...allProductsByCategory,
        {
          category: category.name,
          products: allProducts,
        },
      ];
    }

    res.status(200).json({
      message: 'All product obtained',
      success: true,
      data: allProductsByCategory,
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}

export async function createProductHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const { variants, category, ...product } = req.body;

    //Variables
    let productToSave: ProductCreationAttributes = { ...product };
    let variantsToSave: IVariantToSave[] = variants;
    let productDB: ProductAttibutes | null;
    let categoryDB: CategoryCreationAttributes | null;

    //Search if the category exist

    const store = await Store.findOne({
      where: {
        slug: user.store,
      },
      raw: true,
    });

    if (!store)
      res.status(400).json({
        message: 'Store not found',
        success: false,
      });

    categoryDB = await Category.findOne({
      where: {
        storeId: store?.id,
        name: category,
      },
    });

    if (!categoryDB) {
      const newCat = await Category.create({
        name: category,
        storeId: store?.id,
      });

      categoryDB = await Category.findOne({
        where: {
          id: newCat.id,
        },
        raw: true,
      });
    }

    /* Create the product */
    productToSave = {
      name: product.name,
      description: product.description,
      price: product.price,
      top: product.top,
      imgUrl: product.imgUrl,
      type: product.type,
      categoryId: categoryDB?.id ? categoryDB?.id : 1,
      storeId: store?.id,
    };

    productDB = await Product.create(productToSave);

    /* Create the variants and their options */
    if (!!variantsToSave.length) {
      variantsToSave.forEach(async (variant) => {
        let newVariant: ProductVariantCreationAttributes = {
          title: variant.title,
          optional: variant.optional,
          toSelect: variant.toSelect,
          productId: productDB && productDB.id ? productDB.id : 1,
        };
        let variantDB = await ProductVariant.create(newVariant);

        if (!!variant.options.length) {
          variant.options.forEach(async (option) => {
            if (!option.title || !option.price) return;
            let newOption: ProductVariantOptionCreationAttributes = {
              price: option.price,
              title: option.title,
              show: option.show,
              variantId: variantDB.id,
            };
            await ProductVariantOption.create(newOption);
          });
        }
      });
    }

    res.status(200).json({
      message: 'Product created successfully',
      success: true,
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}
