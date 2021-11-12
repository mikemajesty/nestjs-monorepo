import { MainAPIEnvironment } from './enum';

export abstract class IMainAPISecrets {
  mainAPI: {
    PORT: MainAPIEnvironment;
  };
}

export abstract class ICommonSecrets {
  ENV: string;
}
