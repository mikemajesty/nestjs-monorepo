import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ICommonSecrets } from './adapter';
import { AuthAPIEnvironment, DataBaseEnvironment, MainAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ICommonSecrets {
  constructor() {
    super();
  }

  ENV = this.get<string>('ENV');

  database = {
    CATS: { URI: this.get<string>(DataBaseEnvironment.CATS_DB_URI) },
    AUTH: { URI: this.get<string>(DataBaseEnvironment.AUTH_DB_URI) },
  };

  REDIS_URL = this.get<string>('REDIS_URL');

  mainAPI = {
    PORT: this.get<number>(MainAPIEnvironment.PORT),
  };

  authAPI = {
    PORT: this.get<number>(AuthAPIEnvironment.PORT),
  };
}
