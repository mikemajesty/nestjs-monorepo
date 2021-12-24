import { Module } from '@nestjs/common';

import { CatsModule } from '../cats/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [CatsModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
