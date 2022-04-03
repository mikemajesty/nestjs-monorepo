import { Injectable } from '@nestjs/common';

import { IUserRepository } from '../user/adapter';
import { UserEntity } from '../user/entity';
import { ILoginService } from './adapter';

@Injectable()
export class LoginService implements ILoginService {
  constructor(private userRepository: IUserRepository) {}

  async login(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.logged(user);
  }
}
