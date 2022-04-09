import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';

type ConnectionModel = {
  URI: string;
};

export class DataBaseService implements IDataBaseService {
  constructor(private readonly connection: ConnectionModel) {}

  getDefaultConnection(options?: MongooseModuleOptions): MongooseModuleOptions {
    const connectionOptions = options || {
      appName: 'monorepo',
      uri: this.connection.URI,
      minPoolSize: 5,
      connectTimeoutMS: 2000,
      ...options,
    };

    return connectionOptions;
  }
}
