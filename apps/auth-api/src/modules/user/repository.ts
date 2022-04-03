import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'libs/modules';
import { Model } from 'mongoose';

import { IUserRepository } from './adapter';
import { UserEntity } from './entity';
import { User, UserDocument } from './schema';

@Injectable()
export class UserRepository extends Repository<UserDocument> implements IUserRepository {
  constructor(@InjectModel(User.name) private entity: Model<UserDocument>) {
    super(entity);
  }

  async logged({ login, pass }: UserEntity): Promise<UserEntity> {
    return await this.entity.findOne({ login, pass });
  }
}
