import { Module } from '@nestjs/common';
import { GlobalModule, MainAPIDatabaseModule } from 'libs/modules';

import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, GlobalModule, MainAPIDatabaseModule],
})
export class MainModule {}
