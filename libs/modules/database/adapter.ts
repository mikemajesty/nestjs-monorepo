import { MongooseModuleOptions } from '@nestjs/mongoose';
import { FilterQuery, QueryOptions, SaveOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';

import { CreatedModel, RemovedModel, UpdatedModel } from './entity';

export abstract class IDataBaseService {
  abstract getDefaultConnection(options?: MongooseModuleOptions): MongooseModuleOptions;
}

export abstract class IRepository<T> {
  abstract create(document: object, saveOptions?: SaveOptions): Promise<CreatedModel>;
  abstract findById(id: string | number): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract find(filter: FilterQuery<T>, options?: QueryOptions | null): Promise<T[]>;
  abstract remove(filter: FilterQuery<T>): Promise<RemovedModel>;
  abstract findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T>;
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
