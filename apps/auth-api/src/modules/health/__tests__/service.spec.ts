import { Test } from '@nestjs/testing';

import { IUserRepository } from '@/libs/core/repositories';
import { ILoggerService } from '@/libs/infra/logger';

import { name, version } from '../../../../package.json';
import { IHealthService } from '../adapter';
import { HealthService } from '../service';

describe('HealthService', () => {
  let healthService: IHealthService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: IHealthService,
          useFactory: () =>
            new HealthService(
              { isConnected: jest.fn() } as unknown as IUserRepository,
              { info: jest.fn() } as unknown as ILoggerService,
            ),
        },
      ],
    }).compile();

    healthService = app.get(IHealthService);
  });

  describe('getText', () => {
    test('should getText successfully', async () => {
      await expect(healthService.getText()).resolves.toEqual(`${name}-${version} UP!!`);
    });
  });
});
