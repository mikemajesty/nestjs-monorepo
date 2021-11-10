export default {
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
  setupFilesAfterEnv: [`${__dirname}/main.init.ts`],
  projects: ['<rootDir>/apps/**/jest.config.js'],
};
