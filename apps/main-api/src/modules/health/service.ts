import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/main-api/package.json';
import { IHttpService } from 'libs/modules/common/http/adapter';
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
    private readonly httpService: IHttpService,
  ) {}

  async getText(): Promise<string> {
    const appName = `${name}-${version} UP!!`;

    await this.redisService.isConnected();
    await this.catsRepository.isConnected();

    this.loggerService.log(appName);

    // await this.httpService.instance().post('http://[::1]:4000/api/login', { pass: 'admin', login: 'admin' });
    return appName;
  }
}
