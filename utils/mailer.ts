import config from 'config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: config.get<string>('smtp.host'),
  port: config.get<number>('smtp.port'),
  secure: config.get<boolean>('smtp.secure'),
  auth: {
    user: config.get<string>('smtp.user'),
    pass: config.get<string>('smtp.password'),
  },
});
