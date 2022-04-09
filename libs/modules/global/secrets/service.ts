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
    cats: { URI: this.get<string>('MONGO_INITDB_URI') },
    auth: { URI: this.get<string>('MONGO_AUTH_URI') },
  };

  mainAPI = {
    port: this.get<number>(MainAPIEnvironment.PORT),
  };

  authAPI = {
    port: this.get<number>(AuthAPIEnvironment.PORT),
    jwtToken: this.get<string>(AuthAPIEnvironment.SECRET_JWT),
  };
}
