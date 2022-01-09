import { Module } from '@nestjs/common';
import { CommonModule, GlobalModule } from 'libs/modules';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, CatsModule],
})
export class MainModule {}
