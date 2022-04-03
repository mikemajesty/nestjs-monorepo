import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  database: {
    CATS: { URI: string };
    AUTH: { URI: string };
  };

  mainAPI: {
    port: MainAPIEnvironment | number;
  };

  authAPI: {
    port: AuthAPIEnvironment | number;
    jwtToken: AuthAPIEnvironment | string;
  };
}
