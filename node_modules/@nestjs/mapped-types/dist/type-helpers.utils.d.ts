import { Type } from '@nestjs/common';
export declare function applyIsOptionalDecorator(targetClass: Function, propertyKey: string): void;
export declare function inheritValidationMetadata(parentClass: Type<any>, targetClass: Function, isPropertyInherited?: (key: string) => boolean): string[] | undefined;
export declare function inheritTransformationMetadata(parentClass: Type<any>, targetClass: Function, isPropertyInherited?: (key: string) => boolean): void;
export declare function inheritPropertyInitializers(target: Record<string, any>, sourceClass: Type<any>, isPropertyInherited?: (key: string) => boolean): void;
