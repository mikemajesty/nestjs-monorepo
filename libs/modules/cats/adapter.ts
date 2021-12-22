import { Cat } from './schema';

export abstract class ICatsService {
  abstract save(model: Cat): Promise<Cat>;
}
