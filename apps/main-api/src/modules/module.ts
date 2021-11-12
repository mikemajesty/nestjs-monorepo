import { SharedModule } from '@libs/modules';
import { Module } from '@nestjs/common';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class MainModule {}
