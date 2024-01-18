export declare enum UuidFactoryMode {
    Random = "random",
    Deterministic = "deterministic"
}
export declare class UuidFactory {
    private static _mode;
    static set mode(value: UuidFactoryMode);
    static get(key?: string): any;
}
