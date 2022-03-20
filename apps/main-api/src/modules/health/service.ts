import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/main-api/package.json';
import { ILoggerService } from 'libs/modules/global';

import { IHealthService } from './adapter';

@Injectable()
export class HealthService implements IHealthService {
  constructor(private readonly loggerService: ILoggerService) {}

  async getText(): Promise<string> {
    const appName = `${name}-${version} UP!!`;
    this.loggerService.log(appName, `${HealthService.name}/${this.getText.name}`);
    return appName;
  }
}
