import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LevelWithSilent } from 'pino';

import { ISecretsService } from './adapter';
import { AuthAPIEnvironment, CatsAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }

  ELK_URL = this.get('ELK_URL');

  MONGO_EXPRESS_URL = this.get('MONGO_EXPRESS_URL');
  REDIS_COMMANDER_URL = this.get('REDIS_COMMANDER_URL');
  JEAGER_URL = this.get('JEAGER_URL');
  KIBANA_URL = this.get('KIBANA_URL');

  REDIS_URL = this.get('REDIS_URL');

  ENV = this.get('ENV');

  LOG_LEVEL = this.get<LevelWithSilent>('LOG_LEVEL');

  mongo = {
    URI: this.get('DATABASE_URL'),
  };

  mainAPI = {
    port: this.get<number>(CatsAPIEnvironment.PORT),
    url: this.get(CatsAPIEnvironment.URL),
  };

  authAPI = {
    port: this.get<number>(AuthAPIEnvironment.PORT),
    jwtToken: this.get(AuthAPIEnvironment.SECRET_JWT),
    url: this.get(AuthAPIEnvironment.URL),
  };

  GITHUB_SCRAP_API = this.get('GITHUB_SCRAP_API');
}
