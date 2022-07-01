import config from 'config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import 'reflect-metadata';
import { sequelize } from './database/data-source';
import RootRouter from './routes';
import logger from './utils/logger';
import { fileFilter, storage } from './utils/multer';

const app = express();

//Midleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(multer({ storage, fileFilter }).array('images', 5));

//Routes
app.use('/api/v1', RootRouter);

//Server static files
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/files', express.static(path.join(__dirname, 'files')));

const PORT = config.get<number>('port');

async function main() {
  try {
    await sequelize.sync();
    logger.info(`Database is connected`);
    app.listen(PORT);
    logger.info(`Server is running on http://localhost:${PORT}`);
  } catch (err: any) {
    logger.error(err.message || 'Error');
  }
}

main();
