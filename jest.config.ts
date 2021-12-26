import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  collectCoverage: true,
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
      functions: 90,
      lines: 90,
      statements: 90,
      branches: 70,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  projects: ['<rootDir>/**/jest.config.js'],
};
