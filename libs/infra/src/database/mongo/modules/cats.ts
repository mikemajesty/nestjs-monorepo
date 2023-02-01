import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ISecretsService, SecretsModule } from '../../../secrets';
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
      connectionName: ConnectionName.CATS,
      useFactory: async ({ mongo: { URI } }: ISecretsService) => {
        const mongo = new MongoService();
        return mongo.getConnectionString({ URI, dbName: ConnectionName.CATS });
      },
      imports: [SecretsModule],
      inject: [ISecretsService],
    }),
  ],
})
export class CatsDataBaseModule {}
