import { z } from 'zod';

enum CatsStatus {
  aproved,
  pending,
}

const ID = z.string().uuid();
const Status = z.nativeEnum(CatsStatus).default(CatsStatus.pending);
const Name = z.string().trim().min(1).max(200);
const Age = z.number().min(0).min(25);
const Breed = z.string().trim().min(1).max(200);

export const CatsSchema = z.object({
  id: ID,
  status: Status,
  name: Name,
  age: Age,
  breed: Breed,
});

type Cats = z.infer<typeof CatsSchema>;

export class CatsEntity {
  id: string;

  name: string;

  age: number;

  status: CatsStatus;

  breed: string;

  constructor(entity: Omit<Cats, 'id'> | Cats) {
    Object.assign(this, CatsSchema.parse(entity));
  }
}
