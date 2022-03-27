import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';

import { ApiException } from '../../utils';
import { ILoggerService } from '../global';
import { ICacheService } from './adapter';
import { RedisKeyArgument, RedisKeyValue, RedisValeuArgument } from './types';

@Injectable()
export class CacheService implements ICacheService {
  client: RedisClientType;
  private successKey = 'OK';

  constructor(config: RedisClientOptions, private logger: ILoggerService) {
    this.client = createClient(config);
  }

  async connect(): Promise<RedisClientType> {
    await this.client.connect();
    this.logger.log('Redis connected!', 'Cache');
    return this.client;
  }

  async set(key: RedisKeyArgument, value: RedisValeuArgument, config?: unknown): Promise<void> {
    const setResult = await this.client.set(key, value, config);
    if (setResult !== this.successKey) throw new ApiException(`Cache ${this.set.name} error: ${key} ${value}`);
  }

  async get(key: RedisKeyArgument): Promise<unknown> {
    const getResult = await this.client.get(key);
    if (!getResult) this.logger.warn(`Not found key: ${key}`, 'Cache');

    return getResult;
  }

  async del(key: RedisKeyArgument): Promise<void> {
    const deleted = await this.client.del(key);
    if (!deleted) {
      throw new ApiException(`Cache key: ${key} not deleted`);
    }
  }

  async setMulti(redisList: RedisKeyValue[]): Promise<void> {
    const multi = this.client.multi();

    for (const model of redisList) {
      multi.rPush(model.key, model.value);
    }

    await multi.exec();
  }

  async pExpire(key: RedisKeyArgument, miliseconds: number): Promise<void> {
    const expired = await this.client.pExpire(key, miliseconds);
    if (!expired) throw new ApiException(`Set expire error key: ${key}`, HttpStatus.INTERNAL_SERVER_ERROR, 'Cache');
  }

  async hGet(key: RedisKeyArgument, field: RedisKeyArgument): Promise<unknown | unknown[]> {
    return await this.client.hGet(key, field);
  }

  async hSet(key: RedisKeyArgument, field: RedisKeyArgument, value: RedisValeuArgument): Promise<void> {
    const set = await this.client.hSet(key, field, value);
    if (!set) throw new ApiException(`Cache key: ${key} ${field} not set`);
  }

  async hGetAll(key: RedisKeyArgument): Promise<unknown | unknown[]> {
    return await this.client.hGetAll(key);
  }
}
