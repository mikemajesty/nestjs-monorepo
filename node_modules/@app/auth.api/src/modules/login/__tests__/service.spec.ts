import { Test } from '@nestjs/testing';

import { IUserRepository } from '../../user/adapter';
import { ILoginService } from '../adapter';
import { LoginService } from '../service';

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
          useClass: LoginService,
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
    const user = { login: 'mock', pass: 'pass' };
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
