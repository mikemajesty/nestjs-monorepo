import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'libs/modules';
import { Model } from 'mongoose';

import { ICatsRepository } from './adapter';
import { CatDocument, Cats } from './schema';

@Injectable()
export class CatsRepository extends Repository<CatDocument> implements ICatsRepository {
  constructor(@InjectModel(Cats.name) private entity: Model<CatDocument>) {
    super(entity);
  }

  // custom operator
  async example(): Promise<Cats[]> {
    return await this.entity.find();
  }
}
