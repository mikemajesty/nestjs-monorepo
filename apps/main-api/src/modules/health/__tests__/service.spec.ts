import { Test } from '@nestjs/testing';
import { ICatsRepository } from 'apps/main-api/src/modules/cats/adapter';
import { IHttpService } from 'libs/modules/common/http/adapter';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { GlobalModule } from 'libs/modules/global/module';
import { ICacheService } from 'libs/modules/redis/adapter';

import { name, version } from '../../../../package.json';
import { IHealthService } from '../adapter';
import { HealthService } from '../service';

describe('HealthService', () => {
  let healthService: IHealthService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [
        {
          provide: IHealthService,
          useFactory: () =>
            new HealthService(
              { isConnected: jest.fn() } as unknown as ICatsRepository,
              { isConnected: jest.fn() } as unknown as ICacheService,
              { log: jest.fn() } as unknown as ILoggerService,
              { log: jest.fn() } as unknown as IHttpService,
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
