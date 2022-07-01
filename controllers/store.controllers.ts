import { Request, Response } from 'express';
import { Store } from '../models/store/store.model';
import logger from '../utils/logger';

export async function getInformationHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;

    const store = await Store.findOne({
      where: { userId: user.id },
      raw: true,
    });

    res.status(200).json({
      message: 'Success',
      success: true,
      data: {
        ...store,
      },
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}

export async function updateInformationHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const { slug } = req.body;

    //If the user want to change the slug
    if (user.store !== slug) {
      const isCreated = await Store.findOne({ where: { slug } });

      if (isCreated) {
        return res.status(400).json({
          message: 'Store name is taken',
        });
      }
    }

    await Store.update(req.body, {
      where: {
        userId: user.id,
      },
    });

    const store = await Store.findOne({
      where: { userId: user.id },
      raw: true,
    });

    res.status(200).json({
      message: 'Success',
      success: true,
      data: null,
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}
