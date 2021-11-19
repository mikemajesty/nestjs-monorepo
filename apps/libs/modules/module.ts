import { Global, Module } from '@nestjs/common';

import { HttpService } from './http/service';
import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';

@Global()
@Module({
  imports: [SecretsModule, LoggerModule, HttpService],
  exports: [SecretsModule, LoggerModule, HttpService],
})
export class CoreModule {}
