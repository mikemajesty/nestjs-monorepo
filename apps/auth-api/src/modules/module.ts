import { Module } from '@nestjs/common';

import { MemoryCacheModule, RedisCacheModule } from '@/libs/infra/cache';
import { AuthDataBaseModule } from '@/libs/infra/database';
import { LoggerModule } from '@/libs/infra/logger';
import { SecretsModule } from '@/libs/infra/secrets';
import { TokenModule } from '@/libs/modules/auth/token';

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
