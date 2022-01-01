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


const JEST_ENV_FILE_NAME = 'libs';
const JEST_ENV_COMMON_FILE_NAME = 'common';

module.exports = {
  displayName: name,
  roots: ['.'],
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['index.ts', 'node_modules', 'jest.config.js', 'module.ts', 'adapter.ts'],
  setupFilesAfterEnv: jestInitFileList.filter(p => p.name.includes(JEST_ENV_FILE_NAME) || p.name.includes(JEST_ENV_COMMON_FILE_NAME)).map(j => j.path),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};