import type { Transform } from 'stream'
import type { ClientOptions } from '@elastic/elasticsearch'

export default pinoElasticsearch

declare function pinoElasticsearch(options?: Options): DestinationStream

export type DestinationStream = Transform & {
  /**
   * when something, that cannot be parsed, is encountered
   */
  on(event: 'unknown', handler: (line: string, error: string) => void): void
  /**
   * when a bulk insert request failed which resulted in logs being dropped
   */
  on(event: 'insertError', handler: (error: Error & { document: Record<string, any> }) => void): void
  /**
   * when a batch of logs was sent successfully
   */
  on(event: 'insert', handler: (stats: Record<string, any>) => void): void
  /**
   * when some other kind of error happened, e.g. connection issues
   */
  on(event: 'error', handler: (error: Error) => void): void
}

export type Options = Pick<ClientOptions, 'node' | 'auth' | 'cloud' | 'caFingerprint' | 'Connection' | 'ConnectionPool'> & {
  index?: Index

  type?: string

  /** @deprecated use `opType` instead */
  op_type?: OpType;
  opType?: OpType;

  /** @deprecated use `flushBytes` instead */
  'flush-bytes'?: number | undefined
  flushBytes?: number | undefined

  /** @deprecated use `flushInterval` instead */
  'flush-interval'?: number | undefined
  flushInterval?: number | undefined

  /** @deprecated use `esVersion` instead */
  'es-version'?: number | undefined
  esVersion?: number | undefined

  /** @deprecated use `tls.rejectUnauthorized` instead */
  rejectUnauthorized?: boolean

  tls?: ClientOptions['tls'];
}

export type Index = string | `${string | ''}%{DATE}${string | ''}` | ((logTime: string) => string)

export type OpType = 'create' | 'index'