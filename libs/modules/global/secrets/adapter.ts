import { DatabseEnvironment, MainAPIEnvironment, OtherAPIEnvironment } from './enum';

export abstract class ICommonSecrets {
  ENV: string;

  dbMainAPI: {
    URI: DatabseEnvironment | string;
    Database: DatabseEnvironment | string;
  };

  dbOtherAPI: {
    URI: DatabseEnvironment | string;
    Database: DatabseEnvironment | string;
  };

  mainAPI: {
    PORT: MainAPIEnvironment | number;
  };

  otherAPI: {
    PORT: OtherAPIEnvironment | number;
  };
}
