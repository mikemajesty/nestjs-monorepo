import { Module } from '@nestjs/common';
import { CacheModule, CatsDatabaseModule, CommonModule, GlobalModule } from 'libs/modules';

import { CatsModule } from '../modules/cats/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule, CatsModule, CatsDatabaseModule, CacheModule],
})
export class MainModule {}
