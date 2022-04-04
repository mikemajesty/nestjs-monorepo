import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';

import { IUserRepository } from '../adapter';
import { UserEntity } from '../entity';
import { UserRepository } from '../repository';
import { User } from '../schema';

describe('UserRepository', () => {
  let userRepository: IUserRepository;
  let model: Model<User>;

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
    model = app.get(getModelToken(User.name));
  });
  describe('logged', () => {
    test('should logged successfully', async () => {
      const user = { login: 'loginMock', pass: 'passMock' } as UserEntity;
      model.findOne = jest.fn().mockResolvedValue(user);
      await expect(userRepository.logged({} as UserEntity)).resolves.toEqual(user);
    });

    test('should not found', async () => {
      model.findOne = jest.fn().mockResolvedValue(null);
      await expect(userRepository.logged({} as UserEntity)).resolves.toBeNull();
    });
  });
});
