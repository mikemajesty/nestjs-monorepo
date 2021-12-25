import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'libs/modules';
import { Model } from 'mongoose';

import { ICatsService } from './adapter';
import { CatDocument, Cats } from './schema';

@Injectable()
export class CatsService extends Repository<CatDocument> implements ICatsService {
  constructor(@InjectModel(Cats.name) private entity: Model<CatDocument>) {
    super(entity);
  }
}
