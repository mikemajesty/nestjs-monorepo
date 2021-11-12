import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ICommonSecrets, IMainAPISecrets } from './adapter';
import { MainAPIEnvironment } from './enum';

@Injectable()
export class SecretsService extends ConfigService implements ICommonSecrets, IMainAPISecrets {
  constructor() {
    super();
  }

  ENV = this.get<string>('ENV');

  mainAPI = {
    PORT: this.get<MainAPIEnvironment>(MainAPIEnvironment.PORT),
  };
}
