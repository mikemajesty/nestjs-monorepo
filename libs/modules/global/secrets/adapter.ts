import { DatabseEnvironment, MainAPIEnvironment, OtherAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;

  mainAPI: {
    PORT: MainAPIEnvironment | number;
    db: {
      URI: DatabseEnvironment | string;
      Database: DatabseEnvironment | string;
    };
  };

  otherAPI: {
    PORT: OtherAPIEnvironment | number;
    db: {
      URI: DatabseEnvironment | string;
      Database: DatabseEnvironment | string;
    };
  };
}
