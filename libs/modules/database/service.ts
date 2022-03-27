import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';

type ConnectionModel = {
  URI: string;
};

export class DataBaseService implements IDataBaseService {
  constructor(private connection: ConnectionModel) {}
  getDefaultConnection(options?: MongooseModuleOptions): MongooseModuleOptions {
    return {
      appName: 'monorepo',
      uri: this.connection.URI,
      connectTimeoutMS: 2000,
      ...options,
    };
  }
}
