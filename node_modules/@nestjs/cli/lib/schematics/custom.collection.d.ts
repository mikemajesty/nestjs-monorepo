import { AbstractCollection } from './abstract.collection';
import { Schematic } from './nest.collection';
export interface CollectionSchematic {
    schema: string;
    description: string;
    aliases: string[];
}
export declare class CustomCollection extends AbstractCollection {
    getSchematics(): Schematic[];
}
