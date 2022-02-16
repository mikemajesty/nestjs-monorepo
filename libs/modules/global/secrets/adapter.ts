import { DataBaseEnvironment, MainAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;

  database: {
    host: DataBaseEnvironment | string;
    username: DataBaseEnvironment | string;
    password: DataBaseEnvironment | string;
    dbName: DataBaseEnvironment | string;
  };

  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };
}
