import { Module } from '@nestjs/common';
import { AuthDatabaseModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common/module';
import { GlobalModule } from 'libs/modules/global/module';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule, CommonModule, AuthDatabaseModule],
})
export class MainModule {}
