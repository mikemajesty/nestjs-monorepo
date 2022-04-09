import { Module } from '@nestjs/common';

import { ISecretsService } from '../secrets/adapter';
import { ILoggerService } from './adapter';
import { LoggerService } from './service';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useFactory: ({ ENV }: ISecretsService) => new LoggerService(ENV),
      inject: [ISecretsService],
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
