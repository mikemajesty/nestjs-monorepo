import { UserEntity } from '../user/entity';

export abstract class ILoginService {
  abstract login(user: UserEntity): Promise<UserEntity>;
}
