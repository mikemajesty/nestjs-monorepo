import { Module } from '@nestjs/common';
import { RedisModule } from 'libs/modules/cache/module';

import { CatsModule } from '../cats/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [RedisModule, CatsModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
