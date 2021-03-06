import { RedisClientType } from 'redis';

import { RedisKeyArgument, RedisKeyValue, RedisValeuArgument } from './types';

export abstract class ICacheService {
  abstract client: RedisClientType;
  abstract isConnected(): Promise<void>;
  abstract connect(): Promise<RedisClientType>;
  abstract set(key: RedisKeyArgument, value: RedisValeuArgument, config?: unknown): Promise<void>;
  abstract del(key: RedisKeyArgument): Promise<void>;
  abstract get(key: RedisKeyArgument): Promise<unknown>;
  abstract get(key: RedisKeyArgument): Promise<unknown>;
  abstract setMulti(redisList: RedisKeyValue[]): Promise<void>;
  abstract pExpire(key: RedisKeyArgument, miliseconds: number): Promise<void>;
  abstract hGet(key: RedisKeyArgument, field: RedisKeyArgument): Promise<unknown | unknown[]>;
  abstract hSet(key: RedisKeyArgument, field: RedisKeyArgument, value: RedisValeuArgument): Promise<number>;
  abstract hGetAll(key: RedisKeyArgument): Promise<unknown | unknown[]>;
}
