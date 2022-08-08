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

jest.mock('luxon', () => ({
  DateTime: ({
    fromJSDate: () => ({
      setZone: () => ({
        toFormat: () => '2020-01-01T00:00:00.000Z'
      })
    }),
  })
}));

jest.mock('pino-elasticsearch', () => jest.fn());

jest.mock('pino-multi-stream', () => ({
  multistream: jest.fn()
}));