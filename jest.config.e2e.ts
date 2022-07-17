import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  rootDir: 'apps',
  testRegex: '.*\\.e2e.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '../tests/common-initialization.js',
    './cats-api/tests/initialization.js',
    './auth-api/tests/initialization.js',
    '../libs/modules/tests/initialization.js',
    '../libs/core/tests/initialization.js',
    '../libs/utils/tests/initialization.js',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
};
