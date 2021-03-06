import { Module } from '@nestjs/common';
import { CatsDatabaseModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common/module';
import { GlobalModule } from 'libs/modules/global/module';
import { RedisModule } from 'libs/modules/redis/module';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, CatsModule, CatsDatabaseModule, RedisModule],
})
export class MainModule {}
