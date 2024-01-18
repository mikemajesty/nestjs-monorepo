export declare const InjectModel: (model: string, connectionName?: string) => (target: object, key: string | symbol | undefined, index?: number | undefined) => void;
export declare const InjectConnection: (name?: string) => (target: object, key: string | symbol | undefined, index?: number | undefined) => void;
