import { Module } from '@nestjs/common';
import { ISecretsService } from 'libs/infra/secrets/adapter';
import { SecretsModule } from 'libs/infra/secrets/module';

import { ITokenService } from './adapter';
import { TokenService } from './service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ITokenService,
      useFactory: (secret: ISecretsService) => new TokenService(secret),
      inject: [ISecretsService],
    },
  ],
  exports: [ITokenService],
})
export class TokenModule {}
