import { Type } from '@nestjs/common';
import { MappedType } from './mapped-type.interface';
import { RemoveFieldsWithType } from './types/remove-fields-with-type.type';
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ClassRefsToConstructors<T extends Type[]> = {
    [U in keyof T]: T[U] extends Type<infer V> ? V : never;
};
type Intersection<T extends Type[]> = MappedType<RemoveFieldsWithType<UnionToIntersection<ClassRefsToConstructors<T>[number]>, Function>>;
export declare function IntersectionType<T extends Type[]>(...classRefs: T): Intersection<T>;
export {};
