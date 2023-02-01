import { HttpStatus } from '@nestjs/common';

import { UserEntity } from '@/libs/core/entities/user.entity';

import { ApiException } from '../../../../utils';
import { IUserRepository } from '../../repositories/user.repository';

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async login(model: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ login: model.login, pass: model.password });
    if (!user) throw new ApiException(`username or password is invalid.`, HttpStatus.PRECONDITION_FAILED);
    return user;
  }
}
