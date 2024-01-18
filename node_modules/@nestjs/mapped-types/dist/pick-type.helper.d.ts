import { Type } from '@nestjs/common';
import { MappedType } from './mapped-type.interface';
import { RemoveFieldsWithType } from './types/remove-fields-with-type.type';
export declare function PickType<T, K extends keyof T>(classRef: Type<T>, keys: readonly K[]): MappedType<RemoveFieldsWithType<Pick<T, K>, Function>>;
