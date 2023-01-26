import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ISecretsService } from 'libs/infra/secrets/adapter';
import { SecretsModule } from 'libs/infra/secrets/module';

import { IDataBaseService } from '../../adapter';
import { ConnectionName } from '../../enum';
import { MongoService } from '../service';

@Module({
  providers: [
    {
      provide: IDataBaseService,
      useClass: MongoService,
    },
  ],
  imports: [
    MongooseModule.forRootAsync({
      connectionName: ConnectionName.AUTH,
      useFactory: async ({ mongo: { URI } }: ISecretsService) => {
        const mongo = new MongoService();
        return mongo.getConnectionString({ URI, dbName: ConnectionName.AUTH });
      },
      imports: [SecretsModule],
      inject: [ISecretsService],
    }),
  ],
})
export class AuthDataBaseModule {}
