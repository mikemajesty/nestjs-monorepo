import type { Type } from '@nestjs/common';
import { RuntimeException } from './runtime.exception';
export declare class UnknownRequestMappingException extends RuntimeException {
    constructor(metatype: Type);
}
