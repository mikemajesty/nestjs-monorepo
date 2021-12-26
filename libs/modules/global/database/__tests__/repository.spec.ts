import { Model } from 'mongoose';

import { IRepository } from '../interface';
import { Repository } from '../repository';

class EntityDummy extends Model {}

describe('Repository', () => {
  const buildMock = (mock: unknown) => {
    const repository: IRepository<EntityDummy> = new Repository<EntityDummy>(mock as unknown as Model<EntityDummy>);
    return repository;
  };

  describe('create', () => {
    test('should create successfully', async () => {
      const repository = buildMock(
        jest.fn(() => ({
          save: () => true,
        })),
      );
      await expect(repository.create({})).resolves.toEqual(true);
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

      await expect(repository.remove({})).resolves.toEqual(true);
    });

    test('should remove unsuccessfully', async () => {
      const repository = buildMock({
        remove: () => ({
          deletedCount: 0,
        }),
      });

      await expect(repository.remove({})).resolves.toEqual(false);
    });
  });

  describe('update', () => {
    test('should update successfully', async () => {
      const repository = buildMock({
        updateOne: () => true,
      });
      await expect(repository.update({}, {})).resolves.toEqual(true);
    });
  });
});
