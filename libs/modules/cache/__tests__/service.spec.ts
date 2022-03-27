import { MockUtils } from '@libs/utils/tests/mock-utils';
import { Test } from '@nestjs/testing';

import { ICacheService } from '../adapter';
import { CacheService } from '../service';

describe('ICacheService', () => {
  let service: ICacheService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ICacheService,
          useFactory: (config: { url: 'redis:redis:0000' }) =>
            new CacheService(config, MockUtils.setMock({ log: jest.fn(), warn: jest.fn() })),
        },
      ],
    }).compile();

    service = app.get(ICacheService);
  });

  describe('connect', () => {
    test('should connect successfully', async () => {
      await expect(service.connect()).resolves.not.toBeUndefined();
    });
  });

  describe('set', () => {
    test('should set successfully', async () => {
      const mock = {
        set: () => 'OK',
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.set('keyMock', 'valueMock')).resolves.toBeUndefined();
    });

    test('should set unsuccessfully', async () => {
      const KEY_MOCK = 'keyMock';

      const mock = {
        set: () => 'NOK',
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.set(KEY_MOCK, 'valueMock')).rejects.toThrowError(`Cache set error: ${KEY_MOCK} valueMock`);
    });
  });

  describe('get', () => {
    test('should get successfully', async () => {
      const mock = {
        get: (key: string) => ({ key, value: 'valueMock' }),
      };

      service.client = MockUtils.setMock(mock);

      await expect(service.get('keyMock')).resolves.toEqual({ key: 'keyMock', value: 'valueMock' });
    });

    test('should get unsuccessfully', async () => {
      const mock = {
        get: () => false,
      };

      service.client = MockUtils.setMock(mock);

      await expect(service.get('keyMock')).resolves.toEqual(false);
    });
  });

  describe('del', () => {
    test('should del successfully', async () => {
      const mock = {
        del: () => true,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.del('keyMock')).resolves.toBeUndefined();
    });

    test('should del unsuccessfully', async () => {
      const mock = {
        del: () => false,
      };

      service.client = MockUtils.setMock(mock);
      const KEY = 'keyMock';

      await expect(service.del(KEY)).rejects.toThrow(`Cache key: ${KEY} not deleted`);
    });
  });

  describe('setMulti', () => {
    test('should setMulti successfully', async () => {
      const mock = {
        multi: () => ({
          rPush: jest.fn(),
          exec: jest.fn(),
        }),
      };

      service.client = MockUtils.setMock(mock);

      await expect(service.setMulti([{ key: 'keyMock', value: 'mockValue' }])).resolves.toBeUndefined();
    });
  });

  describe('pExpire', () => {
    test('should pExpire successfully', async () => {
      const mock = {
        pExpire: () => true,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.pExpire('keyMock', 1000)).resolves.toBeUndefined();
    });

    test('should pExpire successfully', async () => {
      const KEY = 'keyMock';

      const mock = {
        pExpire: () => false,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.pExpire(KEY, 1000)).rejects.toThrow(`Set expire error key: ${KEY}`);
    });
  });

  describe('hGet', () => {
    test('should hGet successfully', async () => {
      const mock = {
        hGet: () => true,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hGet('keyMock', 'fieldMock')).resolves.toEqual(true);
    });
  });

  describe('hSet', () => {
    test('should hSet successfully', async () => {
      const mock = {
        hSet: () => true,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hSet('keyMock', 'fieldMock', 'valueMock')).resolves.toBeUndefined();
    });

    test('should hSet unsuccessfully', async () => {
      const KEY = 'keyMock';
      const FIELD = 'fieldMock';

      const mock = {
        hSet: () => false,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hSet(KEY, FIELD, 'valueMock')).rejects.toThrowError(`Cache key: ${KEY} ${FIELD} not set`);
    });
  });

  describe('hGetAll', () => {
    test('should hGetAll successfully', async () => {
      const mock = {
        hGetAll: () => true,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hGetAll('keyMock')).resolves.toEqual(true);
    });
  });
});
