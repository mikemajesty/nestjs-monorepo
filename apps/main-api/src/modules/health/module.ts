import { Module } from '@nestjs/common';
import { HttpModule } from 'libs/modules/common/http/module';
import { RedisModule } from 'libs/modules/redis/module';

import { CatsModule } from '../cats/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [RedisModule, CatsModule, HttpModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
