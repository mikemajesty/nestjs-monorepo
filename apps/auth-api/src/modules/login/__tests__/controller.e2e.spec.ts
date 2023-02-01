import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';

import { IUserRepository } from '@/libs/core/repositories';
import { LoginUseCase } from '@/libs/core/use-cases/user/login.usecase';
import { SecretsModule } from '@/libs/infra/secrets';
import { TokenModule } from '@/libs/modules/auth/token';

import { UserRepository } from '../../user/repository';
import { User } from '../../user/schema';
import { ILoginService } from '../adapter';
import { LoginController } from '../controller';

describe('LoginController (e2e)', () => {
  let app: INestApplication;

  // if you want to mock model functions
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TokenModule, SecretsModule],
      controllers: [LoginController],
      providers: [
        {
          provide: ILoginService,
          useClass: LoginUseCase,
        },
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    model = module.get(getModelToken(User.name));
    app = module.createNestApplication();
    await app.init();
  });

  describe('/login (POST)', () => {
    it(`should login successfully`, async () => {
      model.findOne = jest.fn().mockResolvedValue({ login: 'mockLogin', password: 'passMock', id: 'idMock' });
      const response = await request(app.getHttpServer()).post('/login').send({ login: 'mockLogin', pass: 'passMock' });

      expect(response.body).toHaveProperty('token');

      return response;
    });

    it(`should throw "username or password is invalid" error`, async () => {
      model.findOne = jest.fn();
      return await request(app.getHttpServer())
        .post('/login')
        .send({ login: 'mockLogin', pass: 'passMock' })
        .expect(412);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
