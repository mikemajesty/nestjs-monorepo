import { Test } from '@nestjs/testing';
import { ICatsRepository } from 'apps/cats-api/src/modules/cats/adapter';
import { ICacheService } from 'libs/modules/cache/adapter';
import { ILoggerService } from 'libs/modules/global/logger/adapter';

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
              { isConnected: jest.fn() } as unknown as ICatsRepository,
              { isConnected: jest.fn() } as unknown as ICacheService,
              { info: jest.fn() } as unknown as ILoggerService,
            ),
        },
      ],
    }).compile();

    healthService = app.get(IHealthService);
  });

  describe('getText', () => {
    test('should getText successfully', async () => {
      const text = `${name}-${version} UP!!`;
      await expect(healthService.getText()).resolves.toEqual(text);
    });
  });
});
