import { Module } from '@nestjs/common';
import { AuthDatabaseModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common';
import { GlobalModule } from 'libs/modules/global';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule, CommonModule, AuthDatabaseModule],
})
export class MainModule {}
