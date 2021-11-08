import { Test } from '@nestjs/testing';
import { ILoggerService } from 'apps/libs/modules/modules/logger/adapter';
import { LoggerService } from 'apps/libs/modules/modules/logger/service';

import { name } from '../../../../package.json';
import { IHealthService } from '../adapter';
import { HealthService } from '../service';

describe('HealthService', () => {
  let healthService: IHealthService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: IHealthService,
          useClass: HealthService,
        },
        {
          provide: ILoggerService,
          useClass: LoggerService,
        },
      ],
    }).compile();

    healthService = app.get(IHealthService);
  });

  describe('getText', () => {
    test('should getText successfully', async () => {
      await expect(healthService.getText()).resolves.toEqual(`${name} UP!!`);
    });
  });
});
