import { Module } from '@nestjs/common';
import { ILoggerService } from 'libs/infra/logger/adapter';
import { LoggerModule } from 'libs/infra/logger/module';
import { ISecretsService } from 'libs/infra/secrets/adapter';
import { SecretsModule } from 'libs/infra/secrets/module';

import { ICacheService } from '../adapter';
import { RedisService } from './service';

@Module({
  imports: [LoggerModule, SecretsModule],
  providers: [
    {
      provide: ICacheService,
      useFactory: async ({ REDIS_URL }: ISecretsService, logger: ILoggerService) => {
        const cacheService = new RedisService({ url: REDIS_URL }, logger);
        await cacheService.connect();
        return cacheService;
      },
      inject: [ISecretsService, ILoggerService],
    },
  ],
  exports: [ICacheService],
})
export class RedisCacheModule {}
