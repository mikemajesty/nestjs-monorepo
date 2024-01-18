import { Type } from '@nestjs/common';
import * as mongoose from 'mongoose';
export declare class DefinitionsFactory {
    static createForClass(target: Type<unknown>): mongoose.SchemaDefinition;
    private static inspectTypeDefinition;
    private static inspectRef;
    private static isPrimitive;
    private static isMongooseSchemaType;
}
