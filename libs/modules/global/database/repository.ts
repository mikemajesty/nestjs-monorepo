import { Model } from 'mongoose';
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
}
