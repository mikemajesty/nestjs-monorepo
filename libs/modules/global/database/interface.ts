export interface IDataBaseService {
  connect(uri: string, dbName: string): unknown | void;
}

export abstract class IRepository<T> {
  abstract create(doc: object): Promise<T>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
}
