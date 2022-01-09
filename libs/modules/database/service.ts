import { MongooseModuleOptions } from '@nestjs/mongoose';

type ConnectionModel = {
  Database: string;
  URI: string;
};

export class DataBaseService {
  constructor(private connection: ConnectionModel) {}

  getDefaultConnection(options?: MongooseModuleOptions): MongooseModuleOptions {
    return {
      appName: 'monorepo',
      uri: this.connection.URI,
      dbName: this.connection.Database,
      connectTimeoutMS: 2000,
      ...options,
    };
  }
}
