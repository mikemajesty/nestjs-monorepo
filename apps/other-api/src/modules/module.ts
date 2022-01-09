import { Module } from '@nestjs/common';
import { CommonModule, GlobalModule } from 'libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule, CommonModule],
})
export class MainModule {}
