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

module.exports = {
  displayName: name,
  roots: ['.'],
  name,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['index.ts', 'node_modules', 'jest.config.js', 'swagger.ts'],
  setupFilesAfterEnv: jestInitFileList.map(j => j.path),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}