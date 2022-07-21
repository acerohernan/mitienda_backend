import config from 'config';
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
          message: 'La tienda ya existe, cambia el nombre de usuario',
        });
      }
    }

    await Store.update(req.body, {
      where: {
        userId: user.id,
      },
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

export async function uploadImageHandler(req: Request, res: Response) {
  try {
    if (!req.file)
      return res.status(400).json({
        message: 'Image not found',
        success: false,
      });

    const url = `${
      config.get('url.backend') || 'http://localhost:5000'
    }/images/${req.file?.filename}`;

    res.status(200).json({
      message: 'Image upload successfully',
      success: true,
      data: url,
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}
