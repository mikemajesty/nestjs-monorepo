import { IRepository } from '@/libs/infra/repository';

import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository extends IRepository<UserEntity> {}
