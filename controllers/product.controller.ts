import { Request, Response } from 'express';
import logger from '../utils/logger';

export async function createProductHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    console.log(req.body, user);

    res.status(200).json({
      message: 'Success',
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
