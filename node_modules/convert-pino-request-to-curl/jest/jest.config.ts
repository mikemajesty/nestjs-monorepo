export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  roots: ['<rootDir>/../utils'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  testEnvironment: 'node',
};