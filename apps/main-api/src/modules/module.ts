import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/index';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class MainModule {}
