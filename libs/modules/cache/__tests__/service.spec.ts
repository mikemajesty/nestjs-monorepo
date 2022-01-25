import { Test } from '@nestjs/testing';

import { ApiException } from '../../../utils';
import { ICacheService } from '../adapter';
import { CacheService } from '../service';

describe('ICacheService', () => {
  let service: ICacheService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ICacheService,
          useFactory: (env = 'redis:redis:0000') => new CacheService(env),
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

  describe('get', () => {
    test('should get successfully', async () => {
      const mock = {
        get: () => true,
      };

      service.client = mock;

      await expect(service.get(undefined)).resolves.toEqual(true);
    });
  });

  describe('set', () => {
    test('should set successfully', async () => {
      const mock = {
        set: () => Promise.resolve('OK'),
      };

      service.client = mock;

      await expect(service.set(undefined, undefined)).resolves.toBeUndefined();
    });

    test('should set unsuccessfully', async () => {
      const mock = {
        set: () => Promise.resolve('NOK'),
      };

      service.client = mock;

      await expect(service.set(undefined, undefined)).rejects.toThrowError(
        new ApiException('Cache key: undefined not set'),
      );
    });
  });

  describe('hGet', () => {
    test('should hGet successfully', async () => {
      const mock = {
        hGet: () => true,
      };

      service.client = mock;

      await expect(service.hGet(undefined, undefined)).resolves.toEqual(true);
    });
  });

  describe('hGetAll', () => {
    test('should hGetAll successfully', async () => {
      const mock = {
        hGetAll: () => true,
      };

      service.client = mock;

      await expect(service.hGetAll(undefined)).resolves.toEqual(true);
    });
  });

  describe('hSet', () => {
    test('should hSet successfully', async () => {
      const mock = {
        hSet: () => Promise.resolve(1),
      };

      service.client = mock;

      await expect(service.hSet(undefined, undefined, undefined)).resolves.toBeUndefined();
    });

    test('should hSet unsuccessfully', async () => {
      const mock = {
        hSet: () => Promise.resolve(0),
      };

      service.client = mock;

      await expect(service.hSet(undefined, undefined, undefined)).rejects.toThrowError(
        new ApiException('Cache key: undefined undefined not set'),
      );
    });
  });

  describe('pExpire', () => {
    test('should pExpire successfully', async () => {
      const mock = {
        pExpire: () => Promise.resolve(true),
      };

      service.client = mock;

      await expect(service.pExpire(undefined, undefined)).resolves.toBeUndefined();
    });

    test('should pExpire unsuccessfully', async () => {
      const mock = {
        pExpire: () => Promise.resolve(0),
      };

      service.client = mock;

      await expect(service.pExpire(undefined, undefined)).rejects.toThrowError(
        new ApiException('undefined not set to expired'),
      );
    });
  });

  describe('del', () => {
    test('should del successfully', async () => {
      const mock = {
        del: () => Promise.resolve(true),
      };

      service.client = mock;

      await expect(service.del(undefined)).resolves.toBeUndefined();
    });

    test('should del unsuccessfully', async () => {
      const mock = {
        del: () => Promise.resolve(0),
      };

      service.client = mock;

      await expect(service.del('key')).rejects.toThrowError(new ApiException('Cache key: key not deleted'));
    });
  });

  describe('hDel', () => {
    test('should hDel successfully', async () => {
      const mock = {
        hDel: () => Promise.resolve(true),
      };

      service.client = mock;

      await expect(service.hDel(undefined, undefined)).resolves.toBeUndefined();
    });

    test('should hDel unsuccessfully', async () => {
      const mock = {
        hDel: () => Promise.resolve(0),
      };

      service.client = mock;

      await expect(service.hDel(undefined, undefined)).rejects.toThrowError(
        new ApiException('Cache key: undefined undefined not deleted'),
      );
    });
  });
});
