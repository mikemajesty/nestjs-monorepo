import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConnectionModel } from 'libs/infra';
import { Connection } from 'mongoose';

import { IDataBaseService } from '../adapter';

@Injectable()
export class MongoService implements Partial<IDataBaseService<Connection, ConnectionModel>> {
  client!: Connection;

  // constructor(URI: string) {
  //   this.client = mongoose.createConnection(URI);
  // }

  getConnectionString<T = MongooseModuleOptions>({ URI, dbName }: Partial<ConnectionModel>): T {
    return {
      appName: 'monorepo',
      uri: URI,
      dbName,
    } as T;
  }
}
