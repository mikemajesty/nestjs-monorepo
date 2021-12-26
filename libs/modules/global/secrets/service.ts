import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ICommonSecrets } from './adapter';
import { DatabseEnvironment, MainAPIEnvironment, OtherAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ICommonSecrets {
  constructor() {
    super();
  }

  ENV = this.get<string>('ENV');

  mainAPI = {
    PORT: this.get<number>(MainAPIEnvironment.PORT),
    db: {
      URI: this.get<string>(DatabseEnvironment.URI_MAIN_API),
      Database: this.get<string>(DatabseEnvironment.DB_MAIN_API),
    },
  };

  otherAPI = {
    PORT: this.get<number>(OtherAPIEnvironment.PORT),
    db: {
      URI: this.get<string>(DatabseEnvironment.URI_OTHER_API),
      Database: this.get<string>(DatabseEnvironment.DB_OTHER_API),
    },
  };
}
