import { Module } from '@nestjs/common';
import { LibsModules } from 'libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, LibsModules],
})
export class MainModule {}
