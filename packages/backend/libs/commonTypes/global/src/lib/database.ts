import { DataSourceOptions } from 'typeorm';

/**
 * Get base ORM config
 * @param args
 * @returns
 */
export const BaseOrmConfig = (args: {
  host: string;
  port: string;
  username: string;
  database: string;
  password: string;
}): DataSourceOptions => ({
  type: 'postgres',
  host: args.host,
  port: Number(args.port ?? '5432'),
  username: args.username,
  database: args.database,
  password: args.password,
  logging: false,
  poolSize: 3,
});
