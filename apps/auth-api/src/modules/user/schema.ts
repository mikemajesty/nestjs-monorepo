import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserEntity } from '@/libs/core/entities';

export type UserDocument = UserEntity & Document;

@Schema()
export class User {
  @Prop({ unique: true, index: true })
  login: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
