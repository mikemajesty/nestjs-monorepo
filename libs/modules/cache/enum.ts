// Cache key main-api application
export enum MainAPICacheKey {
  Animals = 'Animals',
}

// Cache key auth-api application
export enum AuthAPICacheKey {}

// Cache key common application
export enum CommonCacheKey {}

export type CacheKey = MainAPICacheKey | AuthAPICacheKey | CommonCacheKey;
