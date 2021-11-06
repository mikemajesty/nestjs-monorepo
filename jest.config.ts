import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'main.ts',
    'node_modules',
    'coverage',
  ],
  coverageThreshold: {
    global: {
      functions: 50,
      statements: 50,
      branches: 50,
      lines: 50,
    },
  },
  setupFilesAfterEnv: ['./apps/config/jest-init.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
