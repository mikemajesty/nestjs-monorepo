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
      const con = service.getDefaultConnection({ dbName: 'db', host: 'mongo', pass: 'pass', port: 10, user: 'user' });

      expect(con).toEqual({
        appName: 'monorepo',
        uri: 'mongodb://user:pass@mongo:10/db?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256',
        minPoolSize: 5,
        connectTimeoutMS: 2000,
      });
    });
  });
});
