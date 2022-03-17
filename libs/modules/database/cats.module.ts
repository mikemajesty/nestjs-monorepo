import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ISecretsService } from '../global';
import { DataBaseEnvironment } from '../global/secrets/enum';
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
      connectionName: DataBaseEnvironment.CATS_CONNECTION_NAME,
      useFactory: ({
        database: {
          CATS: { URI },
        },
      }: ISecretsService) => new DataBaseService({ URI }).getDefaultConnection(),
      inject: [ISecretsService],
    }),
  ],
})
export class CatsDatabaseModule {}
