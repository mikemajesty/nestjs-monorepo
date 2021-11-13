const {
  name
} = require('./package.json');

const {
  pathsToModuleNameMapper
} = require('ts-jest/utils');

const {
  compilerOptions
} = require('../../tsconfig.json');

const commomConfig = require(`../../jest/config.common.js`);

module.exports = {
  displayName: name,
  roots: ['core', 'modules'],
  name,
  preset: 'ts-jest',
  ...commomConfig.default,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}