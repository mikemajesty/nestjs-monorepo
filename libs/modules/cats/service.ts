import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICatsService } from './adapter';
import { Cat, CatDocument } from './schema';

@Injectable()
export class CatsService implements ICatsService {
  constructor(@InjectModel(Cat.name) private model: Model<CatDocument>) {}

  async save(model: Cat): Promise<Cat> {
    return await this.model.create(model);
  }
}
