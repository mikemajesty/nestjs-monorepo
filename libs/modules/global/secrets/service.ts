import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsService } from './adapter';
import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }

  REDIS_URL = this.get<string>('REDIS_URL');

  ENV = this.get<string>('ENV');

  database = {
    CATS: { URI: this.get<string>('MONGO_INITDB_URI') },
    AUTH: { URI: this.get<string>('MONGO_AUTH_URI') },
  };

  mainAPI = {
    PORT: this.get<number>(MainAPIEnvironment.PORT),
  };

  authAPI = {
    PORT: this.get<number>(AuthAPIEnvironment.PORT),
  };
}
