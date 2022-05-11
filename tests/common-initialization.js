// mocks and environment variables that will be shared with all modules.
// if your env or mock will only be used within your module, move that env/mock to your module.

jest.setTimeout(10000);

process.env.ENV = 'test';

process.env.SECRET_JWT = '12345'




// -----------------------------------------------------------MOCK----------------------------------------------------------------//

jest.mock('redis', () => ({
  ...jest.createMockFromModule('redis'),
  RedisClientType: () => ({ ping: () => 'PONG' })
}))

jest.mock('moment-timezone', () => jest.fn(() => ({
  tz: () => ({
    format: jest.fn(),
  })
})));