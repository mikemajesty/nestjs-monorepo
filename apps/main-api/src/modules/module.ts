import { Module } from '@nestjs/common';
import { DatabaseModule, GlobalModule } from 'libs/modules';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CatsModule, DatabaseModule],
})
export class MainModule {}
