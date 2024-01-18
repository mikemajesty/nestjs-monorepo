import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';
import { ConnectionModel } from './types';

@Injectable()
export class DataBaseService implements IDataBaseService {
  getDefaultConnection<T extends MongooseModuleOptions = MongooseModuleOptions>(config: ConnectionModel): T {
    return {
      appName: 'monorepo',
      uri: this.getConnectionString(config),
    } as T;
  }

  private getConnectionString(config: ConnectionModel): string {
    return `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000&authSource=admin&authMechanism=SCRAM-SHA-256`;
  }
}
