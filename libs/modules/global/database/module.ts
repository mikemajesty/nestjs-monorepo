import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ICommonSecrets } from 'libs/modules';

import { IRepository, Repository } from '..';
import { SecretsModule } from '../secrets/module';
import { SecretsService } from '../secrets/service';
import { DataBaseService } from './service';

@Global()
@Module({
  providers: [
    DataBaseService,
    {
      provide: IRepository,
      useClass: Repository,
    },
  ],
  imports: [
    SecretsModule,
    MongooseModule.forRootAsync({
      connectionName: new SecretsService().mainAPI.db.Database,
      useFactory: (
        {
          mainAPI: {
            db: { Database, URI },
          },
        }: ICommonSecrets = new SecretsService(),
      ) => new DataBaseService({ Database, URI }).getDefaultConnection(),
    }),
    MongooseModule.forRootAsync({
      connectionName: new SecretsService().otherAPI.db.Database,
      useFactory: (
        {
          otherAPI: {
            db: { Database, URI },
          },
        }: ICommonSecrets = new SecretsService(),
      ) => new DataBaseService({ Database, URI }).getDefaultConnection(),
    }),
  ],
})
export class DatabaseModule {}
