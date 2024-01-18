import { Module } from '@nestjs/common';
import { TokenModule } from 'libs/modules/auth/token/module';

import { UserModule } from '../user/module';
import { ILoginService } from './adapter';
import { LoginController } from './controller';
import { LoginService } from './service';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [LoginController],
  providers: [
    {
      provide: ILoginService,
      useClass: LoginService,
    },
  ],
  exports: [ILoginService],
})
export class LoginModule {}
