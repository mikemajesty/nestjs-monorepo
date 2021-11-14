const {
  name
} = require('./package.json');

const {
  pathsToModuleNameMapper
} = require('ts-jest/utils');

const {
  compilerOptions
} = require('../../tsconfig.json');

const {
  jestInitFileList
} = require('../../jest');

module.exports = {
  displayName: name,
  roots: ['core', 'shared', 'utils'],
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['index.ts', 'swagger.ts'],
  setupFilesAfterEnv: jestInitFileList,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}