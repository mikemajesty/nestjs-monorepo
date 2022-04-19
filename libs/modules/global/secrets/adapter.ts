import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  database: {
    host: string;
    port: string;
    user: string;
    pass: string;
  };

  mainAPI: {
    port: MainAPIEnvironment | number;
  };

  authAPI: {
    port: AuthAPIEnvironment | number;
    jwtToken: AuthAPIEnvironment | string;
  };
}
