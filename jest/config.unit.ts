import config from './config.common';

export default {
  ...config,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    'index.ts',
    'main.ts',
    'node_modules',
    'coverage',
  ],
};
