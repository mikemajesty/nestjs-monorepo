import { Type } from '@nestjs/common';
import { PropertyMetadata } from '../metadata/property-metadata.interface';
import { SchemaMetadata } from '../metadata/schema-metadata.interface';
export declare class TypeMetadataStorageHost {
    private schemas;
    private properties;
    addPropertyMetadata(metadata: PropertyMetadata): void;
    addSchemaMetadata(metadata: SchemaMetadata): void;
    getSchemaMetadataByTarget(target: Type<unknown>): SchemaMetadata | undefined;
    private compileClassMetadata;
    private getClassFieldsByPredicate;
}
export declare const TypeMetadataStorage: TypeMetadataStorageHost;
