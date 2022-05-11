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

  ELK_URL = this.get<string>('ELK_URL');

  MONGO_EXPRESS_URL = this.get<string>('MONGO_EXPRESS_URL');
  REDIS_COMMANDER_URL = this.get<string>('REDIS_COMMANDER_URL');
  JEAGER_URL = this.get<string>('JEAGER_URL');
  KIBANA_URL = this.get<string>('KIBANA_URL');

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
    url: this.get<number>(MainAPIEnvironment.URL),
  };

  authAPI = {
    port: this.get<number>(AuthAPIEnvironment.PORT),
    jwtToken: this.get<string>(AuthAPIEnvironment.SECRET_JWT),
    url: this.get<string>(AuthAPIEnvironment.URL),
  };
}
