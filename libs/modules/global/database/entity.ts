import { ObjectId } from 'mongoose';

export type UpdatedModel = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | ObjectId;
  upsertedCount: number;
};

export type RemovedModel = {
  deletedCount: number;
  deleted: boolean;
};
