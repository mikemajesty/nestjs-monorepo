import { AbstractRunner } from './abstract.runner';
export declare class SchematicRunner extends AbstractRunner {
    constructor();
    static getModulePaths(): string[];
    static findClosestSchematicsBinary(): string;
}
