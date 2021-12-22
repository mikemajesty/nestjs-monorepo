import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ICommonSecrets } from 'libs/modules';

import { SecretsService } from '../secrets/service';
import { APP_NAME, DB_MAIN_API, DB_OTHER_API } from './constants';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: DB_MAIN_API,
      useFactory: ({ dbMainAPI }: ICommonSecrets = new SecretsService()) => ({
        uri: dbMainAPI.URI,
        dbName: dbMainAPI.Database,
        appName: APP_NAME,
        connectTimeoutMS: 2000,
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: DB_OTHER_API,
      useFactory: ({ dbOtherAPI }: ICommonSecrets = new SecretsService()) => ({
        uri: dbOtherAPI.URI,
        dbName: dbOtherAPI.Database,
        appName: APP_NAME,
        connectTimeoutMS: 2000,
      }),
    }),
  ],
})
export class MainAPIDatabaseModule {}
