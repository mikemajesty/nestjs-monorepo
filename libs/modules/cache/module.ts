import { Global, Module } from '@nestjs/common';

import { ILoggerService } from '../global/logger/adapter';
import { ISecretsService } from '../global/secrets/adapter';
import { ICacheService } from './adapter';
import { CacheService } from './service';

@Global()
@Module({
  providers: [
    {
      provide: ICacheService,
      useFactory: async ({ REDIS_URL }: ISecretsService, logger: ILoggerService) => {
        const cacheService = new CacheService({ url: REDIS_URL }, logger);
        await cacheService.connect();
        return cacheService;
      },
      inject: [ISecretsService, ILoggerService],
    },
  ],
  exports: [ICacheService],
})
export class RedisModule {}
