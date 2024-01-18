import { Type } from '@nestjs/common';
export declare function PartialType<T>(classRef: Type<T>): Type<Partial<T>>;
