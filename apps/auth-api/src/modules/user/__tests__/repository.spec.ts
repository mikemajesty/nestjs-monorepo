import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { IUserRepository } from '../adapter';
import { UserRepository } from '../repository';
import { User } from '../schema';

describe('UserRepository', () => {
  let userRepository: IUserRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    userRepository = app.get(IUserRepository);
  });
  test('should verify instance', async () => {
    expect(userRepository).toBeInstanceOf(UserRepository);
  });
});
