import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from 'libs/modules/auth/token/module';
import { SecretsModule } from 'libs/modules/global/secrets/module';
import { Model } from 'mongoose';
import * as request from 'supertest';

import { IUserRepository } from '../../user/adapter';
import { UserEntity } from '../../user/entity';
import { UserRepository } from '../../user/repository';
import { User } from '../../user/schema';
import { ILoginService } from '../adapter';
import { LoginController } from '../controller';
import { LoginService } from '../service';

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
          useClass: LoginService,
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
      model.findOne = jest.fn().mockResolvedValue({ login: 'mockLogin', pass: 'passMock', id: 'idMock' } as UserEntity);
      const response = await request(app.getHttpServer()).post('/login').send({ login: 'mockLogin', pass: 'passMock' });

      expect(response.body).toHaveProperty('token');

      return response;
    });

    it(`should throw "username or password is invalid" error`, async () => {
      model.findOne = jest.fn();
      return request(app.getHttpServer()).post('/login').send({ login: 'mockLogin', pass: 'passMock' }).expect(412);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
