const {
  name
} = require('./package.json');

const {
  pathsToModuleNameMapper
} = require('ts-jest');

const {
  compilerOptions
} = require('../../tsconfig.json');

const {
  jestInitFileList
} = require('../../tests');

const JEST_ENV_FILE_NAME = 'other-api';
const JEST_ENV_COMMON_FILE_NAME = 'common';

module.exports = {
  rootDir: 'src',
  displayName: name,
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['main.ts', 'swagger.ts', 'node_modules'],
  setupFilesAfterEnv: jestInitFileList.filter(p => p.name.includes(JEST_ENV_FILE_NAME) || p.name.includes(JEST_ENV_COMMON_FILE_NAME)).map(j => j.path),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../../',
  }),
};