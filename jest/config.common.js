const fs = require('fs');

const initFolder = `${__dirname}/init/`;

const initEnvironmentPathList = fs.readdirSync(initFolder).map((file) => initFolder + file);

module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 50,
      statements: 50,
      branches: 50,
      lines: 50,
    },
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: initEnvironmentPathList,
  projects: ['<rootDir>/apps/**/jest.config.js']
};