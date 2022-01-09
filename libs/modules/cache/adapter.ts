import { CacheKey } from './enum';

export type DefaultCacheType = string | number | Buffer;

export abstract class ICacheService {
  abstract connect(): Promise<unknown>;
  abstract set(cache: CacheKey, value: DefaultCacheType): Promise<void>;
  abstract get(key: DefaultCacheType): Promise<unknown>;
  abstract del(key: DefaultCacheType): Promise<void>;
  abstract hGet(key: CacheKey, subKey: DefaultCacheType): Promise<unknown>;
  abstract hSet(key: CacheKey, subKey: DefaultCacheType, value: DefaultCacheType): Promise<void>;
  abstract hDel(key: CacheKey, subKey: string | string[]): Promise<void>;
  abstract hGetAll(key: CacheKey): Promise<unknown>;
  abstract pExpire(key: CacheKey, miliseconds: number): Promise<void>;
}
