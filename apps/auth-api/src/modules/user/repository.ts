import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserRepository } from '@/libs/core/repositories';
import { Repository } from '@/libs/infra/repository';

import { User, UserDocument } from './schema';

@Injectable()
export class UserRepository extends Repository<UserDocument> implements IUserRepository {
  constructor(@InjectModel(User.name) readonly entity: Model<UserDocument>) {
    super(entity);
  }
}
