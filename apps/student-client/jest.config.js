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
  rootDir: 'src',
  displayName: name,
  name,
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.svg$': '../../../tests/svg-transform.js',
    "^.+\\.css$": "../../../tests/style-mock.js",
  },
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['node_modules', 'public'],
  setupFilesAfterEnv: ['../tests/initialization.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../../',
  }),
};