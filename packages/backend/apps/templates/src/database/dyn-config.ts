import { BaseOrmConfig, MS } from '@mfactory-be/commonTypes/global';
import { DataSource } from 'typeorm';

const libPath = process.env.PATH_LIB;

const db = new DataSource({
  ...BaseOrmConfig({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    database: `${process.env.DB_NAME}_${MS.TEMPLATES}`,
    password: process.env.DB_PASS,
  }),
  entities: [`${libPath}/entities/*.ts`],
  migrations: [`${libPath}/migrations/*.ts`],
});

export default db;
