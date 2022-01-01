import { FilterQuery, Model, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Document } from 'mongoose';

import { IRepository } from './adapter';
import { RemovedModel, UpdatedModel } from './entity';

export class Repository<T extends Document> implements IRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: object): Promise<T> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async find(filter: FilterQuery<T>): Promise<T[]> | Promise<T[]> {
    return await this.model.find(filter);
  }

  async remove(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.remove(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async update(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateOne(filter, updated, options);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated, options);
  }
}
