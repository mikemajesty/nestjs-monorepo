import { SerializedGraph } from './serialized-graph';
export declare class PartialGraphHost {
    private static partialGraph;
    static toJSON(): import("./interfaces/serialized-graph-json.interface").SerializedGraphJson;
    static toString(): string;
    static register(partialGraph: SerializedGraph): void;
}
