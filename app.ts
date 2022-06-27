import config from 'config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { sequelize } from './database/data-source';
import RootRouter from './routes';
import logger from './utils/logger';

const app = express();

//Midleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/v1', RootRouter);

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
