import { AuthAPIEnvironment, MainAPIEnvironment } from './enum';

export abstract class ISecretsService {
  ENV: string;
  REDIS_URL: string;

  database: {
    CATS: { URI: string };
    AUTH: { URI: string };
  };

  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };

  authAPI: {
    PORT: AuthAPIEnvironment | number;
  };
}
