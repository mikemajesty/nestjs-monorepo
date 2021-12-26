import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { ICatsRepository } from '../adapter';
import { CatsRepository } from '../repository';
import { Cats } from '../schema';

describe('CatsRepository', () => {
  let repository: ICatsRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
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

    repository = app.get(ICatsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeInstanceOf(CatsRepository);
  });
});
