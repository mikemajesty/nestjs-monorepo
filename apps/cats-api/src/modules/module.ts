import { Module } from '@nestjs/common';
import { CatsDataBaseModule, LoggerModule, RedisCacheModule, SecretsModule } from 'libs/infra';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, SecretsModule, LoggerModule, CatsModule, CatsDataBaseModule, RedisCacheModule],
})
export class MainModule {}
