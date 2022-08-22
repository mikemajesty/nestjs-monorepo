import { RedisClientType } from 'redis';

import { CacheKeyArgument, CacheKeyValue, CacheValeuArgument } from './types';

export abstract class ICacheService {
  abstract client: RedisClientType;
  abstract isConnected(): Promise<void>;
  abstract connect(): Promise<RedisClientType>;
  abstract set(key: CacheKeyArgument, value: CacheValeuArgument, config?: unknown): Promise<void>;
  abstract del(key: CacheKeyArgument): Promise<void>;
  abstract get(key: CacheKeyArgument): Promise<unknown>;
  abstract get(key: CacheKeyArgument): Promise<unknown>;
  abstract setMulti(redisList: CacheKeyValue[]): Promise<void>;
  abstract pExpire(key: CacheKeyArgument, miliseconds: number): Promise<void>;
  abstract hGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]>;
  abstract hSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValeuArgument): Promise<number>;
  abstract hGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]>;
}
