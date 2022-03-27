import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ISecretsService } from '../global';
import { TableName } from '../global/secrets/enum';
import { SecretsModule } from '../global/secrets/module';
import { IDataBaseService, IRepository } from './adapter';
import { Repository } from './repository';
import { DataBaseService } from './service';

@Global()
@Module({
  providers: [
    {
      provide: IDataBaseService,
      useClass: DataBaseService,
    },
    {
      provide: IRepository,
      useClass: Repository,
    },
  ],
  imports: [
    SecretsModule,
    MongooseModule.forRootAsync({
      connectionName: TableName.AUTH,
      useFactory: ({
        database: {
          AUTH: { URI },
        },
      }: ISecretsService) => new DataBaseService({ URI }).getDefaultConnection(),
      inject: [ISecretsService],
    }),
  ],
})
export class AuthDatabaseModule {}
