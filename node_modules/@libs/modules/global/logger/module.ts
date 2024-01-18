import { Module } from '@nestjs/common';

import { ISecretsService } from '../secrets/adapter';
import { ILoggerService } from './adapter';
import { LoggerService } from './service';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useFactory: ({ LOG_LEVEL, ELK_URL }: ISecretsService) => {
        const logger = new LoggerService(ELK_URL);
        logger.connect(LOG_LEVEL);
        return logger;
      },
      inject: [ISecretsService],
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
