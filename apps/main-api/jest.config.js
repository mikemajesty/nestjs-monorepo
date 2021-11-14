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
  rootDir: 'src',
  displayName: name,
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['main.ts', 'swagger.ts'],
  setupFilesAfterEnv: jestInitFileList,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../../',
  }),
}