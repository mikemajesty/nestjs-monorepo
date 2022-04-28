import { Test } from '@nestjs/testing';
import { MockUtils } from 'libs/utils/tests/mock-utils';

import { ICacheService } from '../adapter';
import { RedisService } from '../service';

describe('ICacheService', () => {
  let service: ICacheService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ICacheService,
          useFactory: (config: { url: 'redis:redis:0000' }) =>
            new RedisService(config, MockUtils.setMock({ info: jest.fn(), warn: jest.fn() })),
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

  describe('isConnected', () => {
    test('should connect successfully', async () => {
      const mock = {
        ping: () => 'PONG',
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.isConnected()).resolves.toBeUndefined();
    });

    test('should connect unsuccessfully', async () => {
      const mock = {
        ping: () => false,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.isConnected()).rejects.toThrowError('redis disconnected.');
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
      await expect(service.set(KEY_MOCK, 'valueMock')).rejects.toThrowError(`cache set error: ${KEY_MOCK} valueMock`);
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

      await expect(service.del(KEY)).rejects.toThrow(`cache key: ${KEY} not deleted`);
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
      await expect(service.pExpire(KEY, 1000)).rejects.toThrow(`set expire error key: ${KEY}`);
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
        hSet: () => 1,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hSet('keyMock', 'fieldMock', 'valueMock')).resolves.toEqual(1);
    });

    test('should hSet unsuccessfully', async () => {
      const KEY = 'keyMock';
      const FIELD = 'fieldMock';

      const mock = {
        hSet: () => 0,
      };

      service.client = MockUtils.setMock(mock);
      await expect(service.hSet(KEY, FIELD, 'valueMock')).resolves.toEqual(0);
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
