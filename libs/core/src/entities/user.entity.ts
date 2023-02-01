import { z } from 'zod';

const ID = z.string().uuid();
const Login = z.string().trim().min(4).max(30);
const Password = z.string().trim().min(4).max(30);

export const UserSchema = z.object({
  id: ID,
  login: Login,
  password: Password,
});

type User = z.infer<typeof UserSchema>;

export class UserEntity {
  id: string;

  login: string;

  password: string;

  constructor(entity: Omit<User, 'id'> | User) {
    Object.assign(this, UserSchema.parse(entity));
  }
}
