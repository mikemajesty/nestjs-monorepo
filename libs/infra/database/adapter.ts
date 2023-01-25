export abstract class IDataBaseService<TInstance = unknown, TModel = unknown> {
  abstract client: TInstance;
  abstract getConnectionString<T>(config: TModel): T;
  abstract connect(connection?: string): Promise<TInstance>;
  abstract isConnected(): Promise<boolean> | boolean;
}
