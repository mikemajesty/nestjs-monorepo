import { IRepository } from 'libs/modules';

import { CatDocument } from './schema';

export abstract class ICatsService extends IRepository<CatDocument> {}
