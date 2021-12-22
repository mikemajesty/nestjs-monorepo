export enum DatabseEnvironment {
  URI_MAIN_API = 'MONGO_INITDB_URI',
  URI_OTHER_API = 'MONGO_OTHER_API_URI',
  DB_MAIN_API = 'MONGO_INITDB_DATABASE',
  DB_OTHER_API = 'MONGO_OTHER_API_DATABASE',
}

export enum MainAPIEnvironment {
  PORT = 'PORT_MAIN_API',
}

export enum OtherAPIEnvironment {
  PORT = 'PORT_OTHER_API',
}
