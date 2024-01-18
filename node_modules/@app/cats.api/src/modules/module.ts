import { Module } from '@nestjs/common';
import { CatsDatabaseModule } from 'libs/modules';
import { RedisModule } from 'libs/modules/cache/module';
import { GlobalModule } from 'libs/modules/global/module';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CatsModule, CatsDatabaseModule, RedisModule],
})
export class MainModule {}
