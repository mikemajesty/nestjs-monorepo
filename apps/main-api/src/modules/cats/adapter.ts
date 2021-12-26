import { IRepository } from 'libs/modules';

import { CatDocument, Cats } from './schema';

export abstract class ICatsRepository extends IRepository<CatDocument> {
  abstract dummy(): Promise<Cats[]>;
}
