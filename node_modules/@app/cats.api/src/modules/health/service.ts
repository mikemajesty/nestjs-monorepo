import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/cats-api/package.json';
import { ICacheService } from 'libs/modules/cache/adapter';
import { ILoggerService } from 'libs/modules/global/logger/adapter';

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

    await this.redisService.isConnected();
    await this.catsRepository.isConnected();

    this.loggerService.info({ message: appName });

    return appName;
  }
}
