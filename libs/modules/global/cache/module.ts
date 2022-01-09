import { Module } from '@nestjs/common';

import { ICommonSecrets } from '../secrets/adapter';
import { SecretsService } from '../secrets/service';
import { ICacheService } from './adapter';
import { CacheService } from './service';

@Module({
  providers: [
    {
      provide: ICacheService,
      useFactory: async ({ REDIS_URL }: ICommonSecrets = new SecretsService()) => {
        const cacheService = new CacheService(REDIS_URL);
        await cacheService.connect();
        return cacheService;
      },
    },
  ],
  exports: [ICacheService],
})
export class CacheModule {}
