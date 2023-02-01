import { Test } from '@nestjs/testing';

import { DataBaseService } from '../service';

describe('DataBaseService', () => {
  let service: DataBaseService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: DataBaseService,
          useClass: DataBaseService,
        },
      ],
    }).compile();

    service = app.get(DataBaseService);
  });

  describe('getDefaultConnection', () => {
    test('should verify required properties', () => {
      const con = service.getDefaultConnection({ dbName: 'db', URI: 'dummy' });

      expect(con).toEqual({ dbName: 'db', uri: 'dummy', appName: 'monorepo' });
    });
  });
});
