import { Test } from '@nestjs/testing';

import { ITokenService } from '../../../../modules/auth/token/adapter';
import { MockUtils } from '../../../../utils/tests/mock-utils';
import { IsLoggedMiddleware } from '../is-logged.middleware';

describe('IsLoggedMiddleware', () => {
  let isLoggedMiddleware: IsLoggedMiddleware;
  let tokenService: ITokenService;
  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ITokenService,
          useValue: {
            verify: jest.fn(),
          },
        },
        {
          provide: IsLoggedMiddleware,
          useClass: IsLoggedMiddleware,
        },
      ],
    }).compile();

    isLoggedMiddleware = app.get(IsLoggedMiddleware);
    tokenService = app.get(ITokenService);
  });
  describe('use', () => {
    test('should throw "no token provided" errro', async () => {
      await expect(
        isLoggedMiddleware.use(MockUtils.setMock({ headers: {} }), MockUtils.setMock({}), () => ({})),
      ).rejects.toThrowError('no token provided');
    });

    test('should use successfully', async () => {
      tokenService.verify = jest.fn().mockResolvedValue({ userId: 'mockId' });

      await expect(
        isLoggedMiddleware.use(
          MockUtils.setMock({ headers: { authorization: 'Bearer validToken' } }),
          MockUtils.setMock({}),
          () => ({}),
        ),
      ).resolves.toEqual(undefined);
    });
  });
});
