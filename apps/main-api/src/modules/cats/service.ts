import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICatsService } from './adapter';
import { CatDocument, Cats } from './schema';

@Injectable()
export class CatsService implements ICatsService {
  constructor(@InjectModel(Cats.name) private model: Model<CatDocument>) {}

  async save(model: Cats): Promise<Cats> {
    return await this.model.create(model);
  }
}
