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
  rootDir: '.',
  displayName: name,
  name,
  preset: 'ts-jest',
  ...commomConfig.default,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
}