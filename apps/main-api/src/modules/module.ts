import { CoreModule } from '@libs/modules';
import { Module } from '@nestjs/common';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, CoreModule],
})
export class MainModule {}
