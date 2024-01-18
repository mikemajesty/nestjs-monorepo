import { AuthAPIEnvironment, CatsAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  ELK_URL: string;

  MONGO_EXPRESS_URL: string;
  JEAGER_URL: string;
  REDIS_COMMANDER_URL: string;
  KIBANA_URL: string;

  LOG_LEVEL: string;

  database: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };

  mainAPI: {
    port: CatsAPIEnvironment | number;
    url: CatsAPIEnvironment | string;
  };

  authAPI: {
    port: AuthAPIEnvironment | number;
    jwtToken: AuthAPIEnvironment | string;
    url: AuthAPIEnvironment | string;
  };

  GITHUB_SCRAP_API: string;
}
