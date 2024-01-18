export declare class DeterministicUuidRegistry {
    private static readonly registry;
    static get(str: string, inc?: number): any;
    static clear(): void;
    private static hashCode;
}
