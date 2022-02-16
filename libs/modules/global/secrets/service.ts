import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ICommonSecrets } from './adapter';
import { DataBaseEnvironment, MainAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ICommonSecrets {
  constructor() {
    super();
  }

  database = {
    host: this.get<string>(DataBaseEnvironment.DB_HOST),
    username: this.get<string>(DataBaseEnvironment.DB_USERNAME),
    password: this.get<string>(DataBaseEnvironment.DB_PASSWORD),
    dbName: this.get<string>(DataBaseEnvironment.DB_DATABASE),
  };

  ENV = this.get<string>('ENV');

  mainAPI = {
    PORT: this.get<number>(MainAPIEnvironment.PORT),
  };
}
