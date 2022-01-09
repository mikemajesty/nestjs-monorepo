// Cache key main-api application
export enum MainAPICacheKey {
  Animals = 'Animals',
}

// Cache key other-api application
export enum OtherAPICacheKey {}

// Cache key common application
export enum CommonCacheKey {}

export type CacheKey = MainAPICacheKey | OtherAPICacheKey | CommonCacheKey;
