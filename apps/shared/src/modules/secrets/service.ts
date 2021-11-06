import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsService } from './adapter';

enum Variables {
  ENV = 'ENV',
  MAIN_API_PORT = 'PORT_MAIN_API',
}

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }

  port = {
    MAIN_API: this.get<number>(Variables.MAIN_API_PORT),
  };

  ENV = this.get<string>(Variables.ENV);
}
