import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { IUserRepository } from '@/libs/core/repositories';
import { ConnectionName } from '@/libs/infra/database';

import { UserRepository } from './repository';
import { User, UserDocument, UserSchema } from './schema';

@Module({
  providers: [
    {
      provide: IUserRepository,
      useFactory: (connection: Connection) => {
        return new UserRepository(connection.model<UserDocument>(User.name, UserSchema));
      },
      inject: [getConnectionToken(ConnectionName.AUTH)],
    },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
