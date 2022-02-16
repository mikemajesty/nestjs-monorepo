import { Module } from '@nestjs/common';
import { DataBaseModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common';
import { GlobalModule } from 'libs/modules/global';

import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, DataBaseModule],
})
export class MainModule {}
