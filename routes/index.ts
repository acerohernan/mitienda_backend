import express from 'express';
import storeRouter from './store.routes';
import userRouter from './user.routes';

const RootRouter = express.Router();

RootRouter.use('/user', userRouter);
RootRouter.use('/store', storeRouter);

export default RootRouter;
