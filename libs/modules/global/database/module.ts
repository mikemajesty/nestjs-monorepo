import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ICommonSecrets } from 'libs/modules';

import { SecretsService } from '../secrets/service';
import { DB_MAIN_API, DB_OTHER_API } from './constants';
import { DataBaseService } from './service';

@Global()
@Module({
  providers: [DataBaseService],
  imports: [
    MongooseModule.forRootAsync({
      connectionName: DB_MAIN_API,
      useFactory: ({ dbMainAPI: { Database, URI } }: ICommonSecrets = new SecretsService()) =>
        new DataBaseService({ Database, URI }).getDefaultConnection(),
    }),
    MongooseModule.forRootAsync({
      connectionName: DB_OTHER_API,
      useFactory: ({ dbOtherAPI: { Database, URI } }: ICommonSecrets = new SecretsService()) =>
        new DataBaseService({ Database, URI }).getDefaultConnection(),
    }),
  ],
})
export class DatabaseModule {}
