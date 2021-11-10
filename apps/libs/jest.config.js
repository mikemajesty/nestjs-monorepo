const {
  name
} = require('./package.json');
const commomConfig = require('../../jest/config.common');
const {
  pathsToModuleNameMapper
} = require('ts-jest/utils');

const {
  compilerOptions
} = require('../../tsconfig.json');


module.exports = {
  displayName: name,
  roots: ['core', 'backend', 'modules'],
  name,
  preset: 'ts-jest',
  ...commomConfig.default,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}