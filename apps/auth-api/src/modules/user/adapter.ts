import { IRepository } from 'libs/infra';

import { UserDocument } from './schema';

export abstract class IUserRepository extends IRepository<UserDocument> {}
