import { Connection, ConnectionOptions } from '../connection';
import BaseConnectionPool, { ConnectionPoolOptions, GetConnectionOptions } from './BaseConnectionPool';
export default class WeightedConnectionPool extends BaseConnectionPool {
    index: number;
    maxWeight: number;
    greatestCommonDivisor: number;
    currentWeight: number;
    constructor(opts: ConnectionPoolOptions);
    /**
     * Returns a connection, even if the connection might be dead.
     *
     * @param {object} options (filter)
     * @returns {object|null} connection
     */
    getConnection(opts: GetConnectionOptions): Connection | null;
    /**
     * Set the weight of a connection to the maximum value.
     * If sniffing is not enabled and there is only
     * one node, this method is a noop.
     *
     * @param {object} connection
     */
    markAlive(connection: Connection): this;
    /**
     * Decreases the connection weight.
     * If sniffing is not enabled and there is only
     * one node, this method is a noop.
     *
     * @param {object} connection
     */
    markDead(connection: Connection): this;
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
