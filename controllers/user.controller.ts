import config from 'config';
import { Request, Response } from 'express';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { storeMockInformation } from '../mocks/store.mock';
import { Store } from '../models/store/store.model';
import { User } from '../models/user/user.model';
import { compareHash, hashString } from '../utils/bcrypt';
import { signJwt } from '../utils/jwt';
import logger from '../utils/logger';
import { transporter } from '../utils/mailer';
import { storePrivate, userPrivate } from '../utils/privateFields';

export async function signUpHandler(req: Request, res: Response) {
  try {
    const { email, password, store, country } = req.body;
    // Encrypt the password
    const encryptedPass = await hashString(password);

    // Verify User Exist
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({
        message: 'The email is taken',
        success: false,
      });
    }

    // Verify Store Exist
    const storeExist = await Store.findOne({ where: { slug: store } });

    if (storeExist) {
      return res.status(400).json({
        message: `The store name is taken. Try with ${store}1`,
        success: false,
      });
    }

    // Create user
    const user = await User.create({ email, password: encryptedPass });

    // Create store
    await Store.create({
      ...storeMockInformation,
      country,
      slug: store,
      userId: user.id,
    });

    res.status(200).json({
      message: 'User created successfully',
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

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password, store: storeName } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: 'Email or password are wrong',
        success: false,
      });
    }

    const store = await Store.findOne({ where: { slug: storeName } });

    if (!store) {
      return res.status(401).json({
        message: 'Store are wrong',
        success: false,
      });
    }

    if (store.userId !== user.id) {
      return res.status(401).json({
        message: 'Email or password are wrong',
        success: false,
      });
    }

    const isValid = await compareHash(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: 'Email or password are wrong',
        success: false,
      });
    }

    const userInfo = lodash.omit(user, userPrivate);
    const storeInfo = lodash.omit(store, storePrivate);

    const token = await signJwt({
      ...userInfo,
      store: store.name,
    });

    res.status(200).json({
      message: `Welcome ${user.email}`,
      success: true,
      data: {
        token: token,
        user: userInfo,
        store: storeInfo,
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

export async function forgotStoreHandler(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email',
        success: false,
      });
    }

    const store = await Store.findOne({ where: { userId: user.id } });

    if (!store) {
      return res.status(400).json({
        message: 'Invalid email',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Success',
      success: true,
      data: {
        store: store.slug,
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

export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const { email } = req.body;

    //Validate the user
    const user = await User.findOne({ where: { email } });

    if (user) {
      //Create a code to verify
      const verifyCode = uuid();

      //Save the code in user
      await User.update({ verifyCode }, { where: { id: user.id } });

      //Send the code for email
      await transporter.sendMail({
        from: 'contacto.acero.hernan@gmail.com',
        to: user?.email,
        subject: 'Recover password',
        html: `<p>This is the link to recover password ${config.get(
          'frontend.url'
        )}/forgot-password/${verifyCode}</p>`,
      });
    }

    res.status(200).json({
      message: 'Instructions sent',
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

export async function verifyCodeHandler(req: Request, res: Response) {
  try {
    const { code } = req.body;

    const user = await User.findOne({ where: { verifyCode: code } });

    if (!user) {
      return res.status(400).json({
        message: 'Wrong code',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Success',
      success: true,
      data: { email: user?.email },
    });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}

export async function changePasswordHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const encryptedPassword = await hashString(password);

    await User.update({ password: encryptedPassword }, { where: { email } });

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
