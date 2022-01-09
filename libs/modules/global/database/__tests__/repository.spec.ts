import { Model } from 'mongoose';

import { IRepository } from '../adapter';
import { CreatedModel } from '../entity';
import { Repository } from '../repository';

class EntityDummy extends Model {}

describe('Repository', () => {
  const buildMock = (mock: unknown) => {
    const repository: IRepository<EntityDummy> = new Repository<EntityDummy>(mock as unknown as Model<EntityDummy>);
    return repository;
  };

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

    test.each([undefined, null, ''])('should create unsuccessfully', async (id) => {
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

  describe('remove', () => {
    test('should remove successfully', async () => {
      const repository = buildMock({
        remove: () => ({
          deletedCount: 1,
        }),
      });

      await expect(repository.remove({})).resolves.toEqual({ deleted: true, deletedCount: 1 });
    });

    test('should remove unsuccessfully', async () => {
      const repository = buildMock({
        remove: () => ({
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
