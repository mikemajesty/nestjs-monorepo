import { Module } from '@nestjs/common';
import { AuthDataBaseModule, LoggerModule, MemoryCacheModule, RedisCacheModule, SecretsModule } from 'libs/infra';
import { TokenModule } from 'libs/modules/auth/token/module';

import { HealthModule } from './health/module';
import { LoginModule } from './login/module';
import { UserModule } from './user/module';

@Module({
  imports: [
    HealthModule,
    SecretsModule,
    LoggerModule,
    TokenModule,
    LoginModule,
    UserModule,
    MemoryCacheModule,
    RedisCacheModule,
    AuthDataBaseModule,
  ],
})
export class MainModule {}
