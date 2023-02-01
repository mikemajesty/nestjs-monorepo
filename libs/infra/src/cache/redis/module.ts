import { Module } from '@nestjs/common';

import { ILoggerService, LoggerModule } from '@/libs/infra/logger';
import { ISecretsService, SecretsModule } from '@/libs/infra/secrets';

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
