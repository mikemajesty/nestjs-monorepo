import { Module } from '@nestjs/common';

import { ILoggerService } from '@/libs/infra/logger/adapter';
import { LoggerModule } from '@/libs/infra/logger/module';

import { ICacheService } from '../adapter';
import { MemoryCacheService } from './service';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: ICacheService,
      useFactory: async (logger: ILoggerService) => {
        const cacheService = new MemoryCacheService(logger);
        cacheService.connect();
        return cacheService;
      },
      inject: [ILoggerService],
    },
  ],
  exports: [ICacheService],
})
export class MemoryCacheModule {}
