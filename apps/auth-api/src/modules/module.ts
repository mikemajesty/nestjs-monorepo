import { Module } from '@nestjs/common';
import { AuthDatabaseModule } from 'libs/modules';
import { TokenModule } from 'libs/modules/auth/token/module';
import { LoggerModule } from 'libs/modules/global/logger/module';
import { GlobalModule } from 'libs/modules/global/module';

import { HealthModule } from './health/module';
import { LoginModule } from './login/module';
import { UserModule } from './user/module';

@Module({
  imports: [HealthModule, GlobalModule, AuthDatabaseModule, TokenModule, LoginModule, UserModule, LoggerModule],
})
export class MainModule {}
