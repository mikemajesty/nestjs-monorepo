import { AbstractRunner } from '../runners';
import { Schematic } from './nest.collection';
import { SchematicOption } from './schematic.option';
export declare abstract class AbstractCollection {
    protected collection: string;
    protected runner: AbstractRunner;
    constructor(collection: string, runner: AbstractRunner);
    execute(name: string, options: SchematicOption[], extraFlags?: string): Promise<void>;
    abstract getSchematics(): Schematic[];
    private buildCommandLine;
    private buildOptions;
}
