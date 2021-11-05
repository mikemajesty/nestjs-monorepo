import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsService } from './adapter';

enum Variables {
  ENV = 'ENV',
  PORT = 'PORT',
}

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }

  ENV = this.get<string>(Variables.ENV);
  PORT = this.get<number>(Variables.PORT) || 3000;
}
