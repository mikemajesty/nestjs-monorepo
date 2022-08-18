import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ConnectionName } from 'libs/modules/database/enum';
import { Connection, Model } from 'mongoose';

import { IUserRepository } from './adapter';
import { UserRepository } from './repository';
import { User, UserDocument, UserSchema } from './schema';

@Module({
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useFactory: (connection: Connection) =>
        new UserRepository(connection.model(User.name, UserSchema) as unknown as Model<UserDocument>),
      inject: [getConnectionToken(ConnectionName.AUTH)],
    },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
