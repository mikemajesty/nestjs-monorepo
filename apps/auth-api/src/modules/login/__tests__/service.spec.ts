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
    test('should login successfully', async () => {
      const user = { login: 'mock', pass: 'pass' };
      userRepository.logged = jest.fn().mockResolvedValue(user);
      await expect(loginService.login(user)).resolves.toEqual(user);
    });

    test('should throw "not found login" error', async () => {
      userRepository.logged = jest.fn().mockResolvedValue(null);
      await expect(loginService.login(null)).rejects.toThrowError('username or password is invalid.');
    });
  });
});
