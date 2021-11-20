import { MainAPIEnvironment, OtherAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;
  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };

  otherAPI: {
    PORT: OtherAPIEnvironment | number;
  };
}
