import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  saltWorkFactor: process.env.SALT,
  database: {
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    type: process.env.DB_TYPE,
  },
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
  url: {
    frontend: process.env.FRONTEND_URL,
    backend: process.env.BACKEND_URL,
  },
};
