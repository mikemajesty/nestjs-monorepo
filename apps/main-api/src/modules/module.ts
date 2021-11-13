import { SharedModule } from '@libs/shared';
import { Module } from '@nestjs/common';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class MainModule {}
