import { Global, Module } from '@nestjs/common';

import { ICommonSecrets } from '../global/secrets/adapter';
import { SecretsService } from '../global/secrets/service';
import { ICacheService } from './adapter';
import { CacheService } from './service';

@Global()
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
