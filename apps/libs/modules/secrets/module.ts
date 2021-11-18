import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ICommonSecrets } from './adapter';
import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: ICommonSecrets,
      useClass: SecretsService,
    },
    ConfigService,
  ],
  exports: [ICommonSecrets],
})
export class SecretsModule {}
