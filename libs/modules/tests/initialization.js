// modules libs env and mocks initialization

// PORT
process.env.PORT_MAIN_API = 3000
process.env.PORT_OTHER_API = 4000


// -----------------------------------------------------------MOCK----------------------------------------------------------------//

jest.mock('moment-timezone', () => jest.fn(() => ({
  tz: () => ({
    format: jest.fn(),
  })
})));

jest.mock('redis', () => ({
  createClient: () => ({
    connect: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    hSet: jest.fn(),
    hGet: jest.fn(),
    hGetAll: jest.fn(),
    pExpire: jest.fn(),
    hDel: jest.fn(),
    del: jest.fn()
  }),
}));