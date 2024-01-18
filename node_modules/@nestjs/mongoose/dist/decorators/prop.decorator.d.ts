import * as mongoose from 'mongoose';
export type PropOptions<T = any> = Partial<mongoose.SchemaDefinitionProperty<T>> | mongoose.SchemaType;
export declare function Prop(options?: PropOptions): PropertyDecorator;
