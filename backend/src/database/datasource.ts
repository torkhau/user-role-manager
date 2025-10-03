import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm.config';

export const appDatasource = new DataSource({ ...dataSourceOptions, migrations: ['src/database/migrations/*.ts'] });
