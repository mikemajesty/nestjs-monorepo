import { CustomDecorator, Type } from '@nestjs/common';
/**
 * @publicApi
 */
export interface CreateDecoratorOptions<TParam = any, TTransformed = TParam> {
    /**
     * The key for the metadata.
     * @default uid(21)
     */
    key?: string;
    /**
     * The transform function to apply to the metadata value.
     * @default value => value
     */
    transform?: (value: TParam) => TTransformed;
}
type CreateDecoratorWithTransformOptions<TParam, TTransformed = TParam> = CreateDecoratorOptions<TParam, TTransformed> & Required<Pick<CreateDecoratorOptions<TParam, TTransformed>, 'transform'>>;
/**
 * @publicApi
 */
export type ReflectableDecorator<TParam, TTransformed = TParam> = ((opts?: TParam) => CustomDecorator) & {
    KEY: string;
};
/**
 * Helper class providing Nest reflection capabilities.
 *
 * @see [Reflection](https://docs.nestjs.com/guards#putting-it-all-together)
 *
 * @publicApi
 */
export declare class Reflector {
    /**
     * Creates a decorator that can be used to decorate classes and methods with metadata.
     * Can be used as a strongly-typed alternative to `@SetMetadata`.
     * @param options Decorator options.
     * @returns A decorator function.
     */
    static createDecorator<TParam>(options?: CreateDecoratorOptions<TParam>): ReflectableDecorator<TParam>;
    static createDecorator<TParam, TTransformed>(options: CreateDecoratorWithTransformOptions<TParam, TTransformed>): ReflectableDecorator<TParam, TTransformed>;
    /**
     * Retrieve metadata for a reflectable decorator for a specified target.
     *
     * @example
     * `const roles = this.reflector.get(Roles, context.getHandler());`
     *
     * @param decorator reflectable decorator created through `Reflector.createDecorator`
     * @param target context (decorated object) to retrieve metadata from
     *
     */
    get<T extends ReflectableDecorator<any>>(decorator: T, target: Type<any> | Function): T extends ReflectableDecorator<any, infer R> ? R : unknown;
    /**
     * Retrieve metadata for a specified key for a specified target.
     *
     * @example
     * `const roles = this.reflector.get<string[]>('roles', context.getHandler());`
     *
     * @param metadataKey lookup key for metadata to retrieve
     * @param target context (decorated object) to retrieve metadata from
     *
     */
    get<TResult = any, TKey = any>(metadataKey: TKey, target: Type<any> | Function): TResult;
    /**
     * Retrieve metadata for a specified decorator for a specified set of targets.
     *
     * @param decorator lookup decorator for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAll<T extends ReflectableDecorator<any>>(decorator: T, targets: (Type<any> | Function)[]): T extends ReflectableDecorator<infer R> ? R extends Array<any> ? R : R[] : unknown;
    /**
     * Retrieve metadata for a specified key for a specified set of targets.
     *
     * @param metadataKey lookup key for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAll<TResult extends any[] = any[], TKey = any>(metadataKey: TKey, targets: (Type<any> | Function)[]): TResult;
    /**
     * Retrieve metadata for a specified decorator for a specified set of targets and merge results.
     *
     * @param decorator lookup decorator for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndMerge<T extends ReflectableDecorator<any>>(decorator: T, targets: (Type<any> | Function)[]): T extends ReflectableDecorator<infer R> ? R : unknown;
    /**
     * Retrieve metadata for a specified key for a specified set of targets and merge results.
     *
     * @param metadataKey lookup key for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndMerge<TResult extends any[] | object = any[], TKey = any>(metadataKey: TKey, targets: (Type<any> | Function)[]): TResult;
    /**
     * Retrieve metadata for a specified decorator for a specified set of targets and return a first not undefined value.
     *
     * @param decorator lookup decorator for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndOverride<T extends ReflectableDecorator<any>>(decorator: T, targets: (Type<any> | Function)[]): T extends ReflectableDecorator<infer R> ? R : unknown;
    /**
     * Retrieve metadata for a specified key for a specified set of targets and return a first not undefined value.
     *
     * @param metadataKey lookup key for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndOverride<TResult = any, TKey = any>(metadataKey: TKey, targets: (Type<any> | Function)[]): TResult;
}
export {};
