import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Document } from 'mongoose';

import { IRepository } from './interface';

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

  async remove(filter: FilterQuery<T>): Promise<boolean> {
    const { deletedCount } = await this.model.remove(filter);
    return !!deletedCount;
  }

  async update(filter: FilterQuery<T>, updated: UpdateQuery<T>): Promise<unknown> {
    return await this.model.updateOne(filter, updated);
  }
}
