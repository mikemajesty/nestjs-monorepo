import { Module } from '@nestjs/common';
import { AuthDatabaseModule, CommonModule, GlobalModule } from 'libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule, CommonModule, AuthDatabaseModule],
})
export class MainModule {}
