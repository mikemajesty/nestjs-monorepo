import { Module } from '@nestjs/common';
import { SharedModule } from 'apps/libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class MainModule {}
