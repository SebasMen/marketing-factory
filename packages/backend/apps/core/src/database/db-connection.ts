import { BaseOrmConfig, IDatabase, isTestEnv, MS } from '@mfactory-be/commonTypes/global';
import { Dependencies, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import entities from './entities';
import * as migrations from './migrations';

@Dependencies(CommonService)
@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly commonService: CommonService) {}

  private readonly _entities = [...entities];
  private readonly _migrations = migrations;

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const {
      db_name: database,
      host,
      username,
      password,
      port,
    } = this.commonService.getEnv<IDatabase>('database');
    return {
      ...BaseOrmConfig({
        host,
        port: port.toString(),
        username: username,
        database: `${database}_${MS.CORE}`,
        password,
      }),
      entities: this._entities,
      migrations: this._migrations,
      logging: true,
      synchronize: isTestEnv(),
    };
  }
}
