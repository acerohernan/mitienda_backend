import express from 'express';
import {
  changePasswordHandler,
  forgotPasswordHandler,
  forgotStoreHandler,
  loginHandler,
  signUpHandler,
  verifyCodeHandler,
} from '../controllers/user.controller';
import validate from '../middlewares/validateSchema';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  forgotStoreSchema,
  loginSchema,
  signUpSchema,
  verifyCodeSchema,
} from '../schemas/user.schema';

const userRouter = express.Router();

userRouter.post('/auth/signup', validate(signUpSchema), signUpHandler);

userRouter.post('/auth/login', validate(loginSchema), loginHandler);

userRouter.post(
  '/auth/forgot-store',
  validate(forgotStoreSchema),
  forgotStoreHandler
);

userRouter.post(
  '/auth/forgot-password',
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

userRouter.post(
  '/auth/verify-code',
  validate(verifyCodeSchema),
  verifyCodeHandler
);

userRouter.post(
  '/auth/change-password',
  validate(changePasswordSchema),
  changePasswordHandler
);

export default userRouter;
