import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/main-api/package.json';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { ICacheService } from 'libs/modules/redis/adapter';

import { ICatsRepository } from '../cats/adapter';
import { IHealthService } from './adapter';

@Injectable()
export class HealthService implements IHealthService {
  constructor(
    private readonly catsRepository: ICatsRepository,
    private readonly redisService: ICacheService,
    private readonly loggerService: ILoggerService,
  ) {}

  async getText(): Promise<string> {
    const appName = `${name}-${version} UP!!`;
    this.loggerService.log(appName, `${HealthService.name}/${this.getText.name}`);

    await this.redisService.isConnected();
    await this.catsRepository.isConnected();
    return appName;
  }
}
