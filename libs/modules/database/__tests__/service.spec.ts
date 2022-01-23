import { Test } from '@nestjs/testing';

import { DataBaseService } from '../service';

describe('DataBaseService', () => {
  let service: DataBaseService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: DataBaseService,
          useFactory: () => new DataBaseService({ URI: 'mongodb:mock' }),
        },
      ],
    }).compile();

    service = app.get(DataBaseService);
  });

  describe('getDefaultConnection', () => {
    test('should getDefaultConnection successfully', () => {
      expect(service.getDefaultConnection()).toEqual({
        appName: 'monorepo',
        connectTimeoutMS: 2000,
        uri: 'mongodb:mock',
      });
    });
  });
});
