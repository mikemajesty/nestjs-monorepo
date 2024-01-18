import { InjectionToken } from '@nestjs/common';
import { Edge } from './interfaces/edge.interface';
import { Entrypoint } from './interfaces/entrypoint.interface';
import { OrphanedEnhancerDefinition } from './interfaces/extras.interface';
import { Node } from './interfaces/node.interface';
import { SerializedGraphJson } from './interfaces/serialized-graph-json.interface';
import { SerializedGraphMetadata } from './interfaces/serialized-graph-metadata.interface';
export type SerializedGraphStatus = 'partial' | 'complete';
type WithOptionalId<T extends Record<'id', string>> = Omit<T, 'id'> & Partial<Pick<T, 'id'>>;
export declare class SerializedGraph {
    private readonly nodes;
    private readonly edges;
    private readonly entrypoints;
    private readonly extras;
    private _status;
    private _metadata?;
    private static readonly INTERNAL_PROVIDERS;
    set status(status: SerializedGraphStatus);
    set metadata(metadata: SerializedGraphMetadata);
    insertNode(nodeDefinition: Node): Node;
    insertEdge(edgeDefinition: WithOptionalId<Edge>): {
        id: string;
        metadata: ({
            type: "module-to-module";
        } & {
            sourceModuleName: string;
            targetModuleName: string;
        }) | ({
            type: "class-to-class";
            sourceClassName: string;
            targetClassName: string;
            sourceClassToken: InjectionToken;
            targetClassToken: InjectionToken;
            injectionType: "constructor" | "property" | "decorator";
            keyOrIndex?: string | number | symbol;
            internal?: boolean;
        } & {
            sourceModuleName: string;
            targetModuleName: string;
        });
        source: string;
        target: string;
    };
    insertEntrypoint<T>(definition: Entrypoint<T>, parentId: string): void;
    insertOrphanedEnhancer(entry: OrphanedEnhancerDefinition): void;
    insertAttachedEnhancer(nodeId: string): void;
    getNodeById(id: string): Node;
    toJSON(): SerializedGraphJson;
    toString(): string;
    private generateUuidByEdgeDefinition;
}
export {};
