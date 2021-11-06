import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/modules/module';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class AppModule {}
