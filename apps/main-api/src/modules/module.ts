import { Module } from '@nestjs/common';
import { GlobalModule } from 'libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule],
})
export class MainModule {}
