import { Module } from '@nestjs/common';
import { AuthDatabaseModule } from 'libs/modules';
import { TokenModule } from 'libs/modules/auth/token/module';
import { CommonModule } from 'libs/modules/common/module';
import { GlobalModule } from 'libs/modules/global/module';

import { HealthModule } from './health/module';
import { LoginModule } from './login/module';
import { UserModule } from './user/module';

@Module({
  imports: [HealthModule, GlobalModule, CommonModule, AuthDatabaseModule, TokenModule, LoginModule, UserModule],
})
export class MainModule {}
