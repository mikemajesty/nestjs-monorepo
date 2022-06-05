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
      lines: 90,
      statements: 90,
      functions: 80,
      branches: 60,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  projects: ['<rootDir>/**/jest.config.js'],
  coverageReporters: ['json-summary', 'lcov'],
};
