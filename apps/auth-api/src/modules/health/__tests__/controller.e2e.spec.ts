import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ILoggerService } from 'libs/modules/global';
import { ApiException } from 'libs/utils';
import * as request from 'supertest';

import { name } from '../../../../package.json';
import { IHealthService } from '../adapter';
import { HealthController } from '../controller';
import { HealthService } from '../service';

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let service: IHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: IHealthService,
          useClass: HealthService,
        },
        {
          provide: ILoggerService,
          useValue: { log: jest.fn() },
        },
      ],
      imports: [],
    }).compile();

    app = module.createNestApplication();
    service = module.get(IHealthService);
    await app.init();
  });

  describe('/health (GET)', () => {
    const text = `${name} UP!!`;
    it(`should return ${text}`, async () => {
      return request(app.getHttpServer()).get('/health').expect(text);
    });

    it(`should getHealth with throw statusCode 500`, async () => {
      service.getText = jest.fn().mockRejectedValue(new ApiException('Error'));
      return request(app.getHttpServer()).get('/health').expect({ statusCode: 500, message: 'Error' });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
