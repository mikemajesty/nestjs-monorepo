import { Module } from '@nestjs/common';
import { LoggerModule, RedisCacheModule } from 'libs/infra';

import { CatsModule } from '../cats/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [RedisCacheModule, CatsModule, LoggerModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
