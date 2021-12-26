import { FilterQuery, UpdateQuery } from 'mongoose';

export interface IDataBaseService {
  connect(uri: string, dbName: string): unknown | void;
}

export abstract class IRepository<T> {
  abstract create(doc: object): Promise<T>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract find(filter: FilterQuery<T>): Promise<T[]> | Promise<T>;
  abstract remove(filter: unknown): Promise<boolean>;
  abstract update(filter: FilterQuery<T>, updated: UpdateQuery<T>): Promise<unknown>;
}
