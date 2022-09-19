// modules libs env and mocks initialization

// PORT
process.env.PORT_CATS_API = 3000
process.env.PORT_AUTH_API = 4000

// -----------------------------------------------------------MOCK----------------------------------------------------------------//

jest.mock('redis', () => ({
  createClient: () => ({
    connect: jest.fn(),
  }),
}));

jest.mock('convert-pino-request-to-curl', () => ({
  PinoRequestConverter: { getCurl: jest.fn() }
}));

jest.mock('pino-http', () => ({
  HttpLogger: jest.fn(),
  pinoHttp: jest.fn()
}));

jest.spyOn(process, 'exit').mockReturnValue(true)
jest.mock('pino-elasticsearch', () => jest.fn(() => ({})));
jest.mock('pino', () => jest.genMockFromModule('pino'));

