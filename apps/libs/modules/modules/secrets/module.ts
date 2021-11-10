import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ISecretsService } from './adapter';
import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.main.env'],
    }),
  ],
  providers: [
    {
      provide: ISecretsService,
      useClass: SecretsService,
    },
    ConfigService,
  ],
  exports: [ISecretsService],
})
export class SecretsModule {}
