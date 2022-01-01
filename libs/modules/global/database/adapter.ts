import { FilterQuery, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';

import { RemovedModel, UpdatedModel } from './entity';

export interface IDataBaseService {
  connect(uri: string, dbName: string): unknown | void;
}

export abstract class IRepository<T> {
  abstract create(doc: object): Promise<T>;
  abstract findById(id: string | number): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract find(filter: FilterQuery<T>): Promise<T[]> | Promise<T>;
  abstract remove(filter: FilterQuery<T>): Promise<RemovedModel>;
  abstract update(
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
