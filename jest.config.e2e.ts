import { pathsToModuleNameMapper } from 'ts-jest';

import { jestInitFileList } from './tests';
import { compilerOptions } from './tsconfig.json';

export default {
  rootDir: 'apps',
  testRegex: '.*\\.e2e.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: jestInitFileList,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
};
