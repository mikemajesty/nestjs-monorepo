import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  database: {
    cats: { URI: string };
    auth: { URI: string };
  };

  mainAPI: {
    port: MainAPIEnvironment | number;
  };

  authAPI: {
    port: AuthAPIEnvironment | number;
    jwtToken: AuthAPIEnvironment | string;
  };
}
