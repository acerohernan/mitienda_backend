import express from 'express';
import {
  getInformationHandler,
  updateInformationHandler,
} from '../controllers/store.controllers';
import checkAuth from '../middlewares/checkAuth';

const storeRouter = express.Router();

//GET
storeRouter.get('/get-information', checkAuth, getInformationHandler);

storeRouter.get('/get-report');

storeRouter.get('/get-steps');

storeRouter.get('get-products');

storeRouter.get('get-checkout-options');

//POST
storeRouter.put('/update-information', checkAuth, updateInformationHandler);

export default storeRouter;
