import BaseConnection from './BaseConnection';
import HttpConnection from './HttpConnection';
import UndiciConnection from './UndiciConnection';
export type Connection = BaseConnection | HttpConnection | UndiciConnection;
export type { ConnectionOptions, ConnectionRequestParams, ConnectionRequestOptions, ConnectionRequestOptionsAsStream, ConnectionRequestResponse, ConnectionRequestResponseAsStream } from './BaseConnection';
export { BaseConnection, HttpConnection, UndiciConnection };
