import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ICatsRepository } from 'apps/main-api/src/modules/cats/adapter';
import { IHttpService } from 'libs/modules/common/http/adapter';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { GlobalModule } from 'libs/modules/global/module';
import { ICacheService } from 'libs/modules/redis/adapter';
import { ApiException } from 'libs/utils';
import * as request from 'supertest';

import { name, version } from '../../../../package.json';
import { Cats } from '../../cats/schema';
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
          useFactory: () =>
            new HealthService(
              { isConnected: jest.fn() } as unknown as ICatsRepository,
              { isConnected: jest.fn() } as unknown as ICacheService,
              { log: jest.fn() } as unknown as ILoggerService,
              { log: jest.fn() } as unknown as IHttpService,
            ),
        },
        {
          provide: getModelToken(Cats.name),
          useValue: {},
        },
      ],
      imports: [GlobalModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get(IHealthService);
    await app.init();
  });
  // TODO
  describe('/health (GET)', () => {
    const text = `${name}-${version} UP!!`;
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
