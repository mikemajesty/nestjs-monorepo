import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

import { ApiException } from '../../utils';
import { DefaultCacheType, ICacheService } from './adapter';
import { CacheKey } from './enum';

@Injectable()
export class CacheService implements ICacheService {
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any;

  constructor(url: string) {
    this.url = url;
    this.client = createClient({
      url: this.url,
    });
  }

  async connect(): Promise<unknown> {
    await this.client.connect();

    return this.client;
  }

  async get(key: DefaultCacheType): Promise<unknown> {
    return await this.client.get(key);
  }

  async set(key: CacheKey, value: DefaultCacheType): Promise<void> {
    const set = await this.client.set(key, value);
    if (set !== 'OK') {
      throw new ApiException(`Cache key: ${key} not set`);
    }
  }

  async hGet(key: CacheKey, subKey: DefaultCacheType): Promise<void> {
    return await this.client.hGet(key, subKey);
  }

  async hSet(key: CacheKey, subKey: DefaultCacheType, value: DefaultCacheType): Promise<void> {
    const set = await this.client.hSet(key, subKey, value);
    if (!set) {
      throw new ApiException(`Cache key: ${key} ${subKey} not set`);
    }
  }

  async hGetAll(key: CacheKey): Promise<unknown> {
    return await this.client.hGetAll(key);
  }

  async pExpire(key: CacheKey, miliseconds: number): Promise<void> {
    const expired = await this.client.pExpire(key, miliseconds);
    if (!expired) {
      throw new ApiException(`${key} not set to expired`);
    }
  }

  async del(key: DefaultCacheType): Promise<void> {
    const deleted = await this.client.del(key);
    if (!deleted) {
      throw new ApiException(`Cache key: ${key} not deleted`);
    }
  }

  async hDel(key: CacheKey, subKey: string | string[]): Promise<void> {
    const deleted = await this.client.hDel(key, subKey);
    if (!deleted) {
      throw new ApiException(`Cache key: ${key} ${subKey} not deleted`);
    }
  }
}
