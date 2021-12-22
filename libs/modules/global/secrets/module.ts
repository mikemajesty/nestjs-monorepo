import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
  exports: [ICommonSecrets],
})
export class SecretsModule {}
