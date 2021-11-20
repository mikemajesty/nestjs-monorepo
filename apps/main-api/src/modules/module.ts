import { LibsModules } from '@libs/modules';
import { Module } from '@nestjs/common';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, LibsModules],
})
export class MainModule {}
