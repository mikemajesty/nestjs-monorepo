jest.setTimeout(2000);

Object.assign(process.env, {
  PORT_MAIN_API: 3000,
  ENV: 'test',
});
