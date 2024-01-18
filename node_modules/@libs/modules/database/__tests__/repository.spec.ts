import { Model } from 'mongoose';

import { IRepository } from '../adapter';
import { Repository } from '../repository';
import { CreatedModel } from '../types';

class EntityDummy extends Model {}

const buildMock = (mock: unknown) => {
  const repository: IRepository<EntityDummy> = new Repository<EntityDummy>(mock as unknown as Model<EntityDummy>);
  return repository;
};

describe('Repository', () => {
  describe('create', () => {
    test('should create successfully', async () => {
      const created = { id: '<id>' };

      const repository = buildMock(
        jest.fn(() => ({
          save: () => created,
        })),
      );

      await expect(repository.create({})).resolves.toEqual({ created: true, id: '<id>' } as CreatedModel);
    });

    test.each([undefined, ''])('should create unsuccessfully', async (id) => {
      const notCreated = { id: id, __v: 0 };

      const repository = buildMock(
        jest.fn(() => ({
          save: () => notCreated,
        })),
      );
      await expect(repository.create({})).resolves.toEqual({
        created: false,
        id: id,
      } as CreatedModel);
    });
  });

  describe('find', () => {
    test('should find successfully', async () => {
      const repository = buildMock({
        find: () => true,
      });

      await expect(repository.find({})).resolves.toEqual(true);
    });
  });

  describe('isConnected', () => {
    test('should isConnected successfully', async () => {
      const repository = buildMock({
        db: { readyState: 1 },
      });

      await expect(repository.isConnected()).resolves.toBeUndefined();
    });

    test('should throw disconnected error', async () => {
      const repository = buildMock({
        db: { readyState: 0, name: 'mock' },
      });

      await expect(repository.isConnected()).rejects.toThrow('db mock disconnected');
    });
  });

  describe('findAll', () => {
    test('should findAll successfully', async () => {
      const repository = buildMock({
        find: () => true,
      });

      await expect(repository.findAll()).resolves.toEqual(true);
    });
  });

  describe('findById', () => {
    test('should findById successfully', async () => {
      const repository = buildMock({
        findById: () => true,
      });

      await expect(repository.findById('dummy')).resolves.toEqual(true);
    });
  });

  describe('findOne', () => {
    test('should findOne successfully', async () => {
      const repository = buildMock({
        findOne: () => true,
      });

      await expect(repository.findOne({} as unknown)).resolves.toEqual(true);
    });
  });

  describe('remove', () => {
    test('should remove successfully', async () => {
      const repository = buildMock({
        deleteMany: () => ({
          deletedCount: 1,
        }),
      });

      await expect(repository.remove({})).resolves.toEqual({ deleted: true, deletedCount: 1 });
    });

    test('should remove unsuccessfully', async () => {
      const repository = buildMock({
        deleteMany: () => ({
          deletedCount: 0,
        }),
      });

      await expect(repository.remove({})).resolves.toEqual({ deleted: false, deletedCount: 0 });
    });
  });

  describe('updateOne', () => {
    test('should update successfully', async () => {
      const repository = buildMock({
        updateOne: () => true,
      });
      await expect(repository.updateOne({}, {})).resolves.toEqual(true);
    });
  });

  describe('updateMany', () => {
    test('should update successfully', async () => {
      const repository = buildMock({
        updateMany: () => true,
      });
      await expect(repository.updateMany({}, {})).resolves.toEqual(true);
    });
  });
});
