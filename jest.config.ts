import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['apps', 'libs'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 95,
      lines: 95,
      statements: 95,
      branches: 50,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  projects: ['<rootDir>/**/jest.config.js'],
};
