import { Module } from '@nestjs/common';

import { IUserRepository } from '@/libs/core/repositories';
import { LoginUseCase } from '@/libs/core/use-cases/user/login.usecase';
import { TokenModule } from '@/libs/modules/auth/token';

import { UserModule } from '../user/module';
import { ILoginService } from './adapter';
import { LoginController } from './controller';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [LoginController],
  providers: [
    {
      provide: ILoginService,
      useFactory: (userRepository: IUserRepository) => {
        return new LoginUseCase(userRepository);
      },
    },
  ],
  exports: [ILoginService],
})
export class LoginModule {}
