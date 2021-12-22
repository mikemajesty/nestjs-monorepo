import { Injectable } from '@nestjs/common';
import { name } from 'apps/main-api/package.json';
import { ILoggerService } from 'libs/modules';
import { ICatsService } from 'libs/modules/cats/adapter';

import { IHealthService } from './adapter';

@Injectable()
export class HealthService implements IHealthService {
  constructor(private readonly loggerService: ILoggerService, private readonly catsService: ICatsService) {}

  async getText(): Promise<string> {
    const appName = `${name} UP!!`;
    this.loggerService.log(appName, `${HealthService.name}/${this.getText.name}`);
    await this.catsService.save({ age: 2, breed: 'miau', name: 'Iky' });
    return appName;
  }
}
