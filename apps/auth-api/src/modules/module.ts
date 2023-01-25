import { Module } from '@nestjs/common';
import { AuthDataBaseModule } from 'libs/infra';
import { MemoryCacheModule } from 'libs/infra/cache/memory/module';
import { RedisCacheModule } from 'libs/infra/cache/redis/module';
import { LoggerModule } from 'libs/infra/logger/module';
import { SecretsModule } from 'libs/infra/secrets/module';
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
