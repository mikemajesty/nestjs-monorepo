import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

import { ApiException } from '../../../utils';
import { DefaultCacheType, ICacheService } from './adapter';
import { CacheKey } from './enum';

@Injectable()
export class CacheService implements ICacheService {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async connect(): Promise<any> {
    const client = createClient({
      url: this.url,
    });

    await client.connect();

    return client;
  }

  async get(key: DefaultCacheType): Promise<unknown> {
    const client = await this.connect();
    return await client.get(key);
  }

  async set(key: CacheKey, value: DefaultCacheType): Promise<void> {
    const client = await this.connect();
    const set = await client.set(key, value);
    if (set !== 'OK') {
      throw new ApiException(`Cache key: ${key} not set`);
    }
  }

  async hGet(key: CacheKey, subKey: DefaultCacheType): Promise<void> {
    const client = await this.connect();
    return await client.hGet(key, subKey);
  }

  async hSet(key: CacheKey, subKey: DefaultCacheType, value: DefaultCacheType): Promise<void> {
    const client = await this.connect();
    const set = await client.hSet(key, subKey, value);
    if (!set) {
      throw new ApiException(`Cache key: ${key} not set`);
    }
  }

  async hGetAll(key: CacheKey): Promise<unknown> {
    const client = await this.connect();
    return await client.hGetAll(key);
  }

  async pExpire(key: CacheKey, miliseconds: number): Promise<void> {
    const client = await this.connect();
    const expired = await client.pExpire(key, miliseconds);
    if (!expired) {
      throw new ApiException(`${key} not set to expired`);
    }
  }
}
