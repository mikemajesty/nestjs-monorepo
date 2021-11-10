import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from '../tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'main.ts',
    'node_modules',
    'coverage',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/main.init.ts'],
  coverageThreshold: {
    global: {
      functions: 50,
      statements: 50,
      branches: 50,
      lines: 50,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
