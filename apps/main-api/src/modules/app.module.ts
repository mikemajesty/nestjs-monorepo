import { SharedModule } from '@shared/modules/module';
import { Module } from '@nestjs/common';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, SharedModule],
})
export class AppModule {}
