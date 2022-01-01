import { MainAPIEnvironment, OtherAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;

  mainAPI: {
    PORT: MainAPIEnvironment | number;
    db: {
      URI: MainAPIEnvironment | string;
      Database: MainAPIEnvironment | string;
    };
  };

  otherAPI: {
    PORT: OtherAPIEnvironment | number;
    db: {
      URI: OtherAPIEnvironment | string;
      Database: OtherAPIEnvironment | string;
    };
  };
}
