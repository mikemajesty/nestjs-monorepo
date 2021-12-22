export interface IDataBaseService {
  connect(uri: string, dbName: string): unknown | void;
}
