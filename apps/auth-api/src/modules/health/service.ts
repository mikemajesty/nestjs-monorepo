import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/auth-api/package.json';

import { IUserRepository } from '@/libs/core/repositories';
import { ILoggerService } from '@/libs/infra/logger';

import { IHealthService } from './adapter';

@Injectable()
export class HealthService implements IHealthService {
  constructor(private readonly userRepository: IUserRepository, private readonly loggerService: ILoggerService) {}

  async getText(): Promise<string> {
    const appName = `${name}-${version} UP!!`;
    this.loggerService.info({ message: appName, context: `HealthService/getText` });
    await this.userRepository.isConnected();
    return appName;
  }
}
