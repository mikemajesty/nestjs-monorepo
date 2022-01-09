import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ICacheService, LoggerModule } from 'libs/modules';
import * as request from 'supertest';

import { ICatsRepository } from '../adapter';
import { CatsController } from '../controller';
import { CatsDTO } from '../entity';
import { CatsRepository } from '../repository';
import { Cats } from '../schema';

describe('CatsController (e2e)', () => {
  let app: INestApplication;

  // if you want to mock model functions
  // let model: Model<Cats>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: ICatsRepository,
          useClass: CatsRepository,
        },
        {
          provide: ICacheService,
          useValue: {
            hSet: jest.fn(),
          },
        },
        {
          provide: getModelToken(Cats.name),
          useValue: jest.fn(() => ({
            save: () => true,
          })),
        },
      ],
      imports: [LoggerModule],
    }).compile();

    // mock model functions
    // model = module.get(getModelToken(Cats.name));

    app = module.createNestApplication();
    await app.init();
  });

  describe('/cats (POST)', () => {
    it(`should save successfully`, async () => {
      const dummy: Cats = new CatsDTO();
      return request(app.getHttpServer()).post('/cats').send(dummy).expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
