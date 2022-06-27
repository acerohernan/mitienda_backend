import { object, string } from 'zod';

export const signUpSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Enter a valid email'),
    re_email: string({
      required_error: 'Email Confirmation is required',
    }),
    store: string({
      required_error: 'Store name is required',
    }),
    country: string({
      required_error: 'Country is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password need to have 8 characters at least'),
    phone: string({
      required_error: 'Phone number is required',
    }),
  }).refine((data) => data.email === data.re_email, {
    path: ['re_email'],
    message: 'The emails do not match',
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Enter a valid email'),
    password: string({
      required_error: 'Password is required',
    }),
    store: string({
      required_error: 'Store name is required',
    }),
  }),
});

export const forgotStoreSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Enter a valid email'),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Enter a valid email'),
  }),
});

export const verifyCodeSchema = object({
  body: object({
    code: string({
      required_error: 'Code is required',
    }),
  }),
});

export const changePasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email(),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password need to have 8 characters at least'),
    re_password: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.re_password, {
    path: ['re_password'],
    message: 'The password do not match',
  }),
});
