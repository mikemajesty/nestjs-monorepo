import { Module } from '@nestjs/common';

import { ISecretsService } from '../secrets/adapter';
import { SecretsModule } from '../secrets/module';
import { ILoggerService } from './adapter';
import { LoggerService } from './service';

@Module({
  imports: [SecretsModule],
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
