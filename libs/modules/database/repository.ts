import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'libs/utils';
import { FilterQuery, Model, QueryOptions, SaveOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Document } from 'mongoose';

import { IRepository } from './adapter';
import { CreatedModel, RemovedModel, UpdatedModel } from './entity';

export class Repository<T extends Document> implements IRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async isConnected(): Promise<void> {
    if (this.model.db.readyState !== 1)
      throw new ApiException(`db ${this.model.db.name} disconnected`, HttpStatus.INTERNAL_SERVER_ERROR, 'Database');
  }

  async create(doc: object, saveOptions?: SaveOptions): Promise<CreatedModel> {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save(saveOptions);

    return { id: savedResult.id, created: !!savedResult.id };
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, null, options);
  }

  async findById(id: string | number): Promise<T> {
    return await this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, null, options);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async remove(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.remove(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async updateOne(
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
