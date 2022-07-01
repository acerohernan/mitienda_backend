import { NextFunction, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';
import logger from '../utils/logger';

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = get(req, 'headers.authorization').substr(7);

    if (!token) {
      return res.status(401).json({
        message: 'Unathorized',
        success: false,
      });
    }

    const { decoded } = verifyJwt(token);

    res.locals.user = decoded;

    next();
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}
