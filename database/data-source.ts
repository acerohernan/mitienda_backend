import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import { Store } from '../models/store/store.model';
import { User } from '../models/user/user.model';

export const sequelize = new Sequelize({
  database: config.get<string>('database.name'),
  dialect: config.get<'postgres'>('database.type'),
  username: config.get<'postgres'>('database.username'),
  password: config.get<'postgres'>('database.password'),
  models: [User, Store],
  storage: ':memory:',
});
