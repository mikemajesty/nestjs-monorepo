import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule, SecretsModule } from 'libs/infra';
import * as request from 'supertest';

import { ICatsRepository } from '../adapter';
import { CatsController } from '../controller';
import { CatsEntity } from '../entity';
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
          provide: getModelToken(Cats.name),
          useValue: jest.fn(() => ({
            save: () => true,
          })),
        },
      ],
      imports: [SecretsModule, LoggerModule],
    }).compile();

    // mock model functions
    // model = module.get(getModelToken(Cats.name));

    app = module.createNestApplication();
    await app.init();
  });

  describe('/cats (POST)', () => {
    it(`should save successfully`, async () => {
      const dummy: Cats = new CatsEntity();
      return request(app.getHttpServer()).post('/cats').send(dummy).expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
