import { RedisClientType } from 'redis';

import { RedisKeyArgument, RedisKeyValue, RedisValeuArgument } from './types';

export abstract class ICacheService {
  abstract client: RedisClientType;
  abstract connect(): Promise<RedisClientType>;
  abstract set(key: RedisKeyArgument, value: RedisValeuArgument, config?: unknown): Promise<void>;
  abstract del(key: RedisKeyArgument): Promise<void>;
  abstract get(key: RedisKeyArgument): Promise<unknown>;
  abstract get(key: RedisKeyArgument): Promise<unknown>;
  abstract setMulti(redisList: RedisKeyValue[]): Promise<void>;
  abstract pExpire(key: RedisKeyArgument, miliseconds: number): Promise<void>;
}
