import { Module } from '@nestjs/common';

import { SecretsService } from '..';
import { ILoggerService } from './adapter';
import { LoggerService } from './service';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useFactory: async (env = new SecretsService().ENV) => new LoggerService(env),
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
