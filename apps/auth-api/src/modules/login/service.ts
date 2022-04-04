import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiException } from 'libs/utils';

import { IUserRepository } from '../user/adapter';
import { UserEntity } from '../user/entity';
import { ILoginService } from './adapter';

@Injectable()
export class LoginService implements ILoginService {
  constructor(private userRepository: IUserRepository) {}

  async login(model: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.logged(model);
    if (!user) throw new ApiException(`username or password is invalid.`, HttpStatus.PRECONDITION_FAILED);
    return user;
  }
}
