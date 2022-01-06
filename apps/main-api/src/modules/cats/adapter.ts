import { IRepository } from 'libs/modules';

import { CatDocument } from './schema';

export abstract class ICatsRepository extends IRepository<CatDocument> {}
