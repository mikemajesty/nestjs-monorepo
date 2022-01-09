const {
  name
} = require('./package.json');

const {
  pathsToModuleNameMapper
} = require('ts-jest');

const {
  compilerOptions
} = require('../../tsconfig.json');

module.exports = {
  displayName: name,
  roots: ['.'],
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['index.ts', 'node_modules', 'jest.config.js', 'module.ts', 'adapter.ts'],
  setupFilesAfterEnv: ['../../tests/common-initialization.js', './tests/initialization.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};