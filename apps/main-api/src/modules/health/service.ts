import { Injectable } from '@nestjs/common';
import { ILoggerService } from 'apps/libs/modules/modules/logger/adapter';

import { name } from '../../../package.json';
import { IHealthService } from './adapter';

@Injectable()
export class HealthService implements IHealthService {
  constructor(private readonly loggerService: ILoggerService) {}

  async getText(): Promise<string> {
    const appName = `${name} UP!!`;
    this.loggerService.log(
      appName,
      `${HealthService.name}/${this.getText.name}`,
    );

    return appName;
  }
}
