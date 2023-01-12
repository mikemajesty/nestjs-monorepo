import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { IDataBaseService } from '..';
import { ConnectionModel } from './types';

@Injectable()
export class DataBaseService implements IDataBaseService {
  getDefaultConnection<T extends MongooseModuleOptions = MongooseModuleOptions>({ URI, dbName }: ConnectionModel): T {
    return {
      appName: 'monorepo',
      uri: URI,
      dbName,
    } as T;
  }
}
