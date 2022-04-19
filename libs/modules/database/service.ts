import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';

type ConnectionModel = {
  host: string;
  port: string | number;
  user: string;
  pass: string;
  dbName: string;
};

export class DataBaseService implements IDataBaseService {
  getDefaultConnection(config: ConnectionModel): MongooseModuleOptions {
    const connectionOptions = {
      appName: 'monorepo',
      uri: `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256`,
      minPoolSize: 5,
      connectTimeoutMS: 2000,
    };

    return connectionOptions;
  }
}
