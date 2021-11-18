import { Global, Module } from '@nestjs/common';

import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';

@Global()
@Module({
  imports: [SecretsModule, LoggerModule],
  exports: [SecretsModule, LoggerModule],
})
export class CoreModule {}
