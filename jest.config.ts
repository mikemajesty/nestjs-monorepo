import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { jestInitFileList } from './jest';
import { compilerOptions } from './tsconfig.json';

export default {
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'apps',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  setupFilesAfterEnv: jestInitFileList,
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 80,
      statements: 80,
      branches: 100,
      lines: 80,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  projects: ['<rootDir>/**/jest.config.js'],
};
