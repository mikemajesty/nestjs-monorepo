import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ICommonSecrets } from './adapter';
import { MainAPIEnvironment, OtherAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ICommonSecrets {
  constructor() {
    super();
  }

  ENV = this.get<string>('ENV');

  mainAPI = {
    PORT: this.get<number>(MainAPIEnvironment.PORT),
    db: {
      URI: this.get<string>(MainAPIEnvironment.DB_URI),
      Database: this.get<string>(MainAPIEnvironment.DB_NAME),
    },
  };

  otherAPI = {
    PORT: this.get<number>(OtherAPIEnvironment.PORT),
    db: {
      URI: this.get<string>(OtherAPIEnvironment.DB_URI),
      Database: this.get<string>(OtherAPIEnvironment.DB_NAME),
    },
  };
}
