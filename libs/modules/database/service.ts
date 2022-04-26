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
    const connectionOptions = {
      appName: 'monorepo',
      uri: this.getConnectionString(config),
      connectTimeoutMS: 2000,
    };

    return connectionOptions;
  }

  private getConnectionString(config: ConnectionModel): string {
    return `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?serverSelectionTimeoutMS=50000&connectTimeoutMS=50000&authSource=admin&authMechanism=SCRAM-SHA-256`;
  }
}
