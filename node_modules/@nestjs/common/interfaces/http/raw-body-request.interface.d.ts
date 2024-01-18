/// <reference types="node" />
/**
 * @publicApi
 */
export type RawBodyRequest<T> = T & {
    rawBody?: Buffer;
};
