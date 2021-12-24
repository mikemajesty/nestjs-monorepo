import { MongooseModuleOptions } from '@nestjs/mongoose';

import { APP_NAME } from './constants';

type ConnectionModel = {
  Database: string;
  URI: string;
};

export class DataBaseService {
  constructor(private connection: ConnectionModel) {}

  getDefaultConnection(): MongooseModuleOptions {
    return {
      appName: APP_NAME,
      uri: this.connection.URI,
      dbName: this.connection.Database,
      connectTimeoutMS: 2000,
    };
  }
}
