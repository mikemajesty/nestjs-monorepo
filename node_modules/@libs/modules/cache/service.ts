import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ApiException } from 'libs/utils/exception';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';

import { ILoggerService } from '../global/logger/adapter';
import { ICacheService } from './adapter';
import { CacheKeyArgument, CacheKeyValue, CacheValeuArgument } from './types';

@Injectable()
export class RedisService implements ICacheService {
  client: RedisClientType;

  constructor(
    private readonly config: RedisClientOptions,
    private readonly logger: ILoggerService,
  ) {
    this.client = createClient(this.config) as RedisClientType;
  }

  async isConnected(): Promise<void> {
    const ping = await this.client.ping();
    if (ping !== 'PONG') this.throwException('redis disconnected.');
  }

  async connect(): Promise<RedisClientType> {
    await this.client.connect();
    this.logger.log('Redis connected!\n');
    return this.client;
  }

  async set(key: CacheKeyArgument, value: CacheValeuArgument, config?: unknown): Promise<void> {
    const setResult = await this.client.set(key, value, config);
    if (setResult !== 'OK') this.throwException(`cache ${this.set.name} error: ${key} ${value}`);
  }

  async get(key: CacheKeyArgument): Promise<unknown> {
    const getResult = await this.client.get(key);
    if (!getResult) this.logger.warn({ message: `key: ${key} not found.`, context: RedisService.name });

    return getResult;
  }

  async del(key: CacheKeyArgument): Promise<void> {
    const deleted = await this.client.del(key);
    if (!deleted) this.throwException(`cache key: ${key} not deleted`);
  }

  async setMulti(redisList: CacheKeyValue[]): Promise<void> {
    const multi = this.client.multi();

    for (const model of redisList) {
      multi.rPush(model.key, model.value);
    }

    await multi.exec();
  }

  async pExpire(key: CacheKeyArgument, miliseconds: number): Promise<void> {
    const expired = await this.client.pExpire(key, miliseconds);
    if (!expired) this.throwException(`set expire error key: ${key}`);
  }

  async hGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]> {
    return await this.client.hGet(key, field);
  }

  async hSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValeuArgument): Promise<number> {
    return await this.client.hSet(key, field, value);
  }

  async hGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]> {
    return await this.client.hGetAll(key);
  }

  private throwException(error: string) {
    throw new ApiException(error, HttpStatus.INTERNAL_SERVER_ERROR, RedisService.name);
  }
}
