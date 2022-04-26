import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LevelWithSilent } from 'pino';

import { ISecretsService } from './adapter';
import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }

  REDIS_URL = this.get<string>('REDIS_URL');

  ENV = this.get<string>('ENV');

  LOG_LEVEL = this.get<LevelWithSilent>('LOG_LEVEL');

  database = {
    host: this.get<string>('MONGO_HOST'),
    port: this.get<string>('MONGO_PORT'),
    user: this.get<string>('MONGO_INITDB_ROOT_USERNAME'),
    pass: this.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
  };

  mainAPI = {
    port: this.get<number>(MainAPIEnvironment.PORT),
  };

  authAPI = {
    port: this.get<number>(AuthAPIEnvironment.PORT),
    jwtToken: this.get<string>(AuthAPIEnvironment.SECRET_JWT),
  };
}
