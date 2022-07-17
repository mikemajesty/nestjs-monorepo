import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';

import { ICatsRepository } from '../adapter';
import { CatsRepository } from '../repository';
import { Cats } from '../schema';

describe('CatsRepository', () => {
  let repository: ICatsRepository;
  let model: Model<Cats>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Cats.name),
          useValue: {},
        },
        {
          provide: ICatsRepository,
          useClass: CatsRepository,
        },
      ],
    }).compile();

    model = module.get(getModelToken(Cats.name));
    repository = module.get(ICatsRepository);
  });

  test('should be defined', async () => {
    expect(model).toBeInstanceOf(Object);
    expect(repository).toBeInstanceOf(CatsRepository);
  });
});
