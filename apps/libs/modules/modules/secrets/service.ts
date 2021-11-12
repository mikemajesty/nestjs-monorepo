import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IMainAPISecrets, MainAPIEnvironment } from './adapter';

@Injectable()
export class SecretsService extends ConfigService implements IMainAPISecrets {
  constructor() {
    super();
  }

  mainAPI: {
    ENV: MainAPIEnvironment.ENV;
    PORT: MainAPIEnvironment.PORT;
  };
}
