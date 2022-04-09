import { IRepository } from 'libs/modules';

import { UserDocument } from './schema';

export abstract class IUserRepository extends IRepository<UserDocument> {}
