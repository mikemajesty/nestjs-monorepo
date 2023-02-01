import { UserEntity } from '@/libs/core/entities';

export abstract class ILoginService {
  abstract login(user: UserEntity): Promise<UserEntity>;
}
