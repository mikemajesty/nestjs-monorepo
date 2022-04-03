import { IRepository } from 'libs/modules';

import { UserEntity } from './entity';
import { UserDocument } from './schema';

export abstract class IUserRepository extends IRepository<UserDocument> {
  abstract logged(user: UserEntity): Promise<UserEntity>;
}
