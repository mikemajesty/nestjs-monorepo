import { Module } from '@nestjs/common';
import { LoggerModule } from 'libs/modules/global/logger/module';

import { UserModule } from '../user/module';
import { IHealthService } from './adapter';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [UserModule, LoggerModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
