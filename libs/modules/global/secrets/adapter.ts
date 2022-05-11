import { LevelWithSilent } from 'pino';

import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  ELK_URL: string;

  MONGO_EXPRESS_URL: string;
  JEAGER_URL: string;
  REDIS_COMMANDER_URL: string;
  KIBANA_URL: string;

  LOG_LEVEL: LevelWithSilent;

  database: {
    host: string;
    port: string;
    user: string;
    pass: string;
  };

  mainAPI: {
    port: MainAPIEnvironment | number;
    url: MainAPIEnvironment | number;
  };

  authAPI: {
    port: AuthAPIEnvironment | number;
    jwtToken: AuthAPIEnvironment | string;
    url: AuthAPIEnvironment | string;
  };
}
