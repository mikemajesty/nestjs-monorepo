import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ISecretsService } from './adapter';
import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: ISecretsService,
      useClass: SecretsService,
    },
  ],
  exports: [ISecretsService],
})
export class SecretsModule {}
