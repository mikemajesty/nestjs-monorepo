import { Test } from '@nestjs/testing';
import { ICatsService } from 'apps/main-api/src/modules/cats/adapter';
import { LoggerModule } from 'libs/modules/global/logger/module';

import { name } from '../../../../package.json';
import { IHealthService } from '../adapter';
import { HealthService } from '../service';

describe('HealthService', () => {
  let healthService: IHealthService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        {
          provide: ICatsService,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: IHealthService,
          useClass: HealthService,
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
