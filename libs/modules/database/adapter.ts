import { FilterQuery, QueryOptions, SaveOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';

import { CreatedModel, RemovedModel, UpdatedModel } from './entity';

export interface IDataBaseService {
  connect(uri: string, dbName: string): void;
}

export abstract class IRepository<T> {
  abstract create(doc: object, saveOptions?: SaveOptions): Promise<CreatedModel>;
  abstract findById(id: string | number): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract find(filter: FilterQuery<T>, options?: QueryOptions | null): Promise<T[]>;
  abstract remove(filter: FilterQuery<T>): Promise<RemovedModel>;
  abstract updateOne(
    filter: FilterQuery<T>,
    updated: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
  ): Promise<UpdatedModel>;
  abstract updateMany(
    filter: FilterQuery<T>,
    updated: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions,
  ): Promise<UpdatedModel>;
}
