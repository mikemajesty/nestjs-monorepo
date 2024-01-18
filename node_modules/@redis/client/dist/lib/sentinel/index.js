"use strict";
// import { RedisModules } from '../../dist';
// import { RedisClientOptions } from '../client';
// import { RedisCommandArgument, RedisExtensions, RedisFunctions, RedisScripts } from '../commands';
// type WithUrl = {
//     url: string;
//     // TODO
//     // url: `redis${'s'?}://${string}${string}:${number}`;
// };
// type WithoutUrl = {
//     host: string;
//     port: number;
// };
// type WithPassword = {
//     password: string;
// };
// type WithAcl = WithPassword & {
//     username: string;
// }
// export type RedisSentinelClientOptions = (WithUrl | WithoutUrl) & {
// };
// interface RedisSentinelOptions<
//     M extends RedisModules,
//     F extends RedisFunctions,
//     S extends RedisScripts
// > extends RedisExtensions<M, F, S> {
//     // TODO: better name
//     rootNodes: Array<
//     defaults?: RedisSentinelClientOptions;
//     name: RedisCommandArgument;
//     useReplicas?: boolean;
// }
// class RedisSentinel<
//     M extends RedisModules = Record<string, never>,
//     F extends RedisFunctions = Record<string, never>,
//     S extends RedisScripts = Record<string, never>
// > {
//     constructor(options: RedisSentinelOptions<M, F, S>) {
//     }
// }
