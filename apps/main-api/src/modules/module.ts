import { Module } from '@nestjs/common';
import { CatsDatabaseModule, RedisModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common';
import { GlobalModule } from 'libs/modules/global';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, CatsModule, CatsDatabaseModule, RedisModule],
})
export class MainModule {}
