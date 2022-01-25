import { AuthAPIEnvironment, DataBaseEnvironment, MainAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;

  database: {
    CATS: { URI: DataBaseEnvironment | string };
    AUTH: { URI: DataBaseEnvironment | string };
  };

  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };

  authAPI: {
    PORT: AuthAPIEnvironment | number;
  };
}
