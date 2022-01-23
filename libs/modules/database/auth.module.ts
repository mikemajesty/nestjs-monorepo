import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ICommonSecrets } from '../global';
import { DataBaseEnvironment } from '../global/secrets/enum';
import { SecretsModule } from '../global/secrets/module';
import { IRepository } from './adapter';
import { Repository } from './repository';
import { DataBaseService } from './service';

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
      connectionName: DataBaseEnvironment.AUTH_CONNECTION_NAME,
      useFactory: ({
        database: {
          AUTH: { URI },
        },
      }: ICommonSecrets) => new DataBaseService({ URI }).getDefaultConnection(),
      inject: [ICommonSecrets],
    }),
  ],
})
export class AuthDatabaseModule {}
