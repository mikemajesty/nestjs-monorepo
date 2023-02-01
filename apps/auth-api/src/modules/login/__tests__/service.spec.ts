import { Test } from '@nestjs/testing';

import { IUserRepository } from '@/libs/core/repositories';
import { LoginUseCase } from '@/libs/core/use-cases/user/login.usecase';

import { ILoginService } from '../adapter';

describe('LoginService', () => {
  let loginService: ILoginService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const app = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: ILoginService,
          useClass: LoginUseCase,
        },
        {
          provide: IUserRepository,
          useValue: {
            logged: jest.fn(),
          },
        },
      ],
    }).compile();

    loginService = app.get(ILoginService);
    userRepository = app.get(IUserRepository);
  });

  describe('login', () => {
    const user = { login: 'mock', password: 'pass', id: '7624a959-fd87-4dc8-bebd-e7af38539d85' };
    test('should login successfully', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      await expect(loginService.login(user)).resolves.toEqual(user);
    });

    test('should throw "not found login" error', async () => {
      userRepository.findOne = jest.fn();
      await expect(loginService.login(user)).rejects.toThrow('username or password is invalid.');
    });
  });
});
