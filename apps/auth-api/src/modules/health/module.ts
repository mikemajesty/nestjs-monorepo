import { Module } from '@nestjs/common';
import { MemoryCacheModule } from 'libs/infra/cache/memory/module';
import { LoggerModule } from 'libs/infra/logger/module';

import { UserModule } from '../user/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [UserModule, LoggerModule, MemoryCacheModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
