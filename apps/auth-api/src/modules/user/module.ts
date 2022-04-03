import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionName } from 'libs/modules/database/enum';

import { IUserRepository } from './adapter';
import { UserRepository } from './repository';
import { User, UserSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConnectionName.AUTH)],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
