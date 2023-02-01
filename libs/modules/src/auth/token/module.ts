import { Module } from '@nestjs/common';

import { ISecretsService, SecretsModule } from '@/libs/infra/secrets';

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
