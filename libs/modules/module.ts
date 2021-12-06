import { Global, Module } from '@nestjs/common';

import { HttpModule } from './http/module';
import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';

@Global()
@Module({
  imports: [SecretsModule, LoggerModule, HttpModule],
  exports: [SecretsModule, LoggerModule, HttpModule],
})
export class LibsModules {}
