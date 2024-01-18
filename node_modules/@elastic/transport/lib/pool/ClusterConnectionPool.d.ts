import BaseConnectionPool, { ConnectionPoolOptions, GetConnectionOptions } from './BaseConnectionPool';
import { Connection, ConnectionOptions } from '../connection';
export interface ResurrectOptions {
    now: number;
    requestId: string | number;
    name: string | symbol;
    context: any;
}
export interface ResurrectEvent {
    strategy: string;
    name: string | symbol;
    request: {
        id: string;
    };
    isAlive: boolean;
    connection: Connection;
}
export default class ClusterConnectionPool extends BaseConnectionPool {
    dead: string[];
    resurrectTimeout: number;
    resurrectTimeoutCutoff: number;
    pingTimeout: number;
    resurrectStrategy: number;
    static resurrectStrategies: {
        none: number;
        ping: number;
        optimistic: number;
    };
    constructor(opts: ConnectionPoolOptions);
    /**
     * Marks a connection as 'alive'.
     * If needed removes the connection from the dead list
     * and then resets the `deadCount`.
     *
     * @param {object} connection
     */
    markAlive(connection: Connection): this;
    /**
     * Marks a connection as 'dead'.
     * If needed adds the connection to the dead list
     * and then increments the `deadCount`.
     *
     * @param {object} connection
     */
    markDead(connection: Connection): this;
    /**
     * If enabled, tries to resurrect a connection with the given
     * resurrect strategy ('ping', 'optimistic', 'none').
     *
     * @param {object} { now, requestId }
     */
    resurrect(opts: ResurrectOptions): void;
    /**
     * Returns an alive connection if present,
     * otherwise returns a dead connection.
     * By default it filters the `master` only nodes.
     * It uses the selector to choose which
     * connection return.
     *
     * @param {object} options (filter and selector)
     * @returns {object|null} connection
     */
    getConnection(opts: GetConnectionOptions): Connection | null;
    /**
     * Empties the connection pool.
     *
     * @returns {ConnectionPool}
     */
    empty(): Promise<void>;
    /**
     * Update the ConnectionPool with new connections.
     *
     * @param {array} array of connections
     * @returns {ConnectionPool}
     */
    update(connections: Array<Connection | ConnectionOptions>): this;
}
