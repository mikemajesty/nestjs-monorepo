import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IMainAPISecrets } from './adapter';
import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.main.env'],
    }),
  ],
  providers: [
    {
      provide: IMainAPISecrets,
      useClass: SecretsService,
    },
    ConfigService,
  ],
  exports: [IMainAPISecrets],
})
export class SecretsModule {}
