import { Global, Module } from '@nestjs/common';

import { CacheModule } from './cache/module';
import { DatabaseModule } from './database/module';
import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';

@Global()
@Module({
  imports: [LoggerModule, SecretsModule, DatabaseModule, CacheModule],
  exports: [LoggerModule, SecretsModule, DatabaseModule, CacheModule],
})
export class GlobalModule {}
