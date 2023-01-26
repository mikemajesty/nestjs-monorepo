import { IRepository } from 'libs/infra';

import { CatDocument } from './schema';

export abstract class ICatsRepository extends IRepository<CatDocument> {}
