// mocks and environment variables that will be shared with all modules.
// if your env or mock will only be used within your module, move that env/mock to your module.

jest.setTimeout(2000);

process.env.ENV = 'test';

process.env.SECRET_JWT = '12345'




// -----------------------------------------------------------MOCK----------------------------------------------------------------//