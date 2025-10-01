import { DataSourceOptions } from 'typeorm';
import { Role, User } from './entities';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'data/database.sqlite',
  entities: [User, Role],
  synchronize: false,
};
