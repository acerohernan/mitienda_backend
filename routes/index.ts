import express from 'express';
import userRouter from './user.routes';

const RootRouter = express.Router();

RootRouter.use('/user', userRouter);

export default RootRouter;
