import { Cats } from './schema';

export abstract class ICatsService {
  abstract save(model: Cats): Promise<Cats>;
}
