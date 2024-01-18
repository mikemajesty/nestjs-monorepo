/// <reference types="lodash" />
import { Type } from '@nestjs/common';
import { SchemaObject } from '../interfaces/open-api-spec.interface';
export declare const exploreGlobalApiResponseMetadata: (schemas: Record<string, SchemaObject>, metatype: Type<unknown>) => {
    responses: import("lodash").Dictionary<boolean>;
};
export declare const exploreApiResponseMetadata: (schemas: Record<string, SchemaObject>, instance: object, prototype: Type<unknown>, method: Function) => import("lodash").Dictionary<boolean> | {
    [x: number]: {
        description: string;
    };
};
