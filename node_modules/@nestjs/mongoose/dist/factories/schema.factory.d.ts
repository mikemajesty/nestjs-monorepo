import { Type } from '@nestjs/common';
import * as mongoose from 'mongoose';
export declare class SchemaFactory {
    static createForClass<TClass = any>(target: Type<TClass>): mongoose.Schema<TClass>;
}
