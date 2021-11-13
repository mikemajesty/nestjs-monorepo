import { MainAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;
  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };
}
