import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';

type ConnectionModel = {
  host: string;
  port: string | number;
  user: string;
  pass: string;
  dbName: string;
};

@Injectable()
export class DataBaseService implements IDataBaseService {
  getDefaultConnection(config: ConnectionModel): MongooseModuleOptions {
    return {
      appName: 'monorepo',
      uri: this.getConnectionString(config),
    };
  }

  private getConnectionString(config: ConnectionModel): string {
    return `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000&authSource=admin&authMechanism=SCRAM-SHA-256`;
  }
}
