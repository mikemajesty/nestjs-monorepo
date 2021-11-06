import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';
import { SharedService } from './service';

@Global()
@Module({
  imports: [SecretsModule, LoggerModule],
  providers: [SharedService],
  exports: [SharedService, SecretsModule, LoggerModule],
})
export class SharedModule {}
