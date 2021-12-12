// PORT
process.env.PORT_MAIN_API = 3000
process.env.PORT_OTHER_API = 4000


// -----------------------------------------------------------MOCK----------------------------------------------------------------//

jest.mock('moment-timezone', () => jest.fn(() => ({
  tz: () => ({
    format: jest.fn(),
  })
})));