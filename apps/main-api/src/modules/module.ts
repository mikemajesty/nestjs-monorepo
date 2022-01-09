import { Module } from '@nestjs/common';
import { CacheModule, CommonModule, DatabaseModule, GlobalModule } from 'libs/modules';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, CatsModule, DatabaseModule, CacheModule],
})
export class MainModule {}
