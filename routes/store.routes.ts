import express from 'express';
import {
  createProductHandler,
  getProductsHandler,
} from '../controllers/product.controller';
import {
  getInformationHandler,
  updateInformationHandler,
  uploadImageHandler,
} from '../controllers/store.controllers';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validateSchema';
import { createProductSchema } from '../schemas/product.schema';
import { upload } from '../utils/multer';

const storeRouter = express.Router();

//GET
storeRouter.get('/get-information', checkAuth, getInformationHandler);

storeRouter.get('get-products', checkAuth, getProductsHandler);

storeRouter.get('/get-report');

storeRouter.get('/get-steps');

storeRouter.get('get-checkout-options');

//POST
storeRouter.post(
  '/create-product',
  checkAuth,
  validate(createProductSchema),
  createProductHandler
);

storeRouter.post(
  '/upload-image',
  checkAuth,
  upload.single('image'),
  uploadImageHandler
);

//PUT
storeRouter.put('/update-information', checkAuth, updateInformationHandler);

export default storeRouter;
