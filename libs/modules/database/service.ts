import { Injectable, Scope } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ICommonSecrets } from '../global';

@Injectable({ scope: Scope.TRANSIENT })
export class DatabaseService {
  constructor(private secretService: ICommonSecrets) {}

  getConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.secretService.database.host,
      username: this.secretService.database.username,
      password: this.secretService.database.password,
      database: this.secretService.database.dbName,
      synchronize: this.secretService.ENV !== 'prd',
      migrationsRun: true,
      autoLoadEntities: true,
    };
  }
}
