export enum MainAPIEnvironment {
  ENV = 'ENV',
  PORT = 'PORT_MAIN_API',
}
export abstract class IMainAPISecrets {
  mainAPI: {
    ENV: MainAPIEnvironment;
    PORT: MainAPIEnvironment;
  };
}
