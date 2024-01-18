'use strict'

/* eslint no-prototype-builtins: 0 */

const split = require('split2')
const { Client } = require('@elastic/elasticsearch')

function initializeBulkHandler (opts, client, splitter) {
  const esVersion = Number(opts.esVersion || opts['es-version']) || 7
  const index = opts.index || 'pino'
  const buildIndexName = typeof index === 'function' ? index : null
  const type = esVersion >= 7 ? undefined : (opts.type || 'log')
  const opType = esVersion >= 7 ? (opts.opType || opts.op_type) : undefined

  // Resurrect connection pool on destroy
  splitter.destroy = () => {
    if (typeof client.connectionPool.resurrect === 'function') {
      client.connectionPool.resurrect({ name: 'elasticsearch-js' })
    }
  }

  const bulkInsert = client.helpers.bulk({
    datasource: splitter,
    flushBytes: opts.flushBytes || opts['flush-bytes'] || 1000,
    flushInterval: opts.flushInterval || opts['flush-interval'] || 30000,
    refreshOnCompletion: getIndexName(),
    onDocument (doc) {
      const date = doc.time || doc['@timestamp']
      if (opType === 'create') {
        doc['@timestamp'] = date
      }

      return {
        index: {
          _index: getIndexName(date),
          _type: type,
          op_type: opType
        }
      }
    },
    onDrop (doc) {
      const error = new Error('Dropped document')
      error.document = doc
      splitter.emit('insertError', error)
    }
  })

  bulkInsert.then(
    (stats) => splitter.emit('insert', stats),
    (err) => splitter.emit('error', err)
  )

  function getIndexName (time = new Date().toISOString()) {
    if (buildIndexName) {
      return buildIndexName(time)
    }
    return index.replace('%{DATE}', time.substring(0, 10))
  }
}

function pinoElasticSearch (opts = {}) {
  if (opts['flush-bytes']) {
    process.emitWarning('The "flush-bytes" option has been deprecated, use "flushBytes" instead')
  }

  if (opts['flush-interval']) {
    process.emitWarning('The "flush-interval" option has been deprecated, use "flushInterval" instead')
  }

  if (opts['es-version']) {
    process.emitWarning('The "es-version" option has been deprecated, use "esVersion" instead')
  }

  if (opts['bulk-size']) {
    process.emitWarning('The "bulk-size" option has been removed, use "flushBytes" instead')
    delete opts['bulk-size']
  }

  const splitter = split(function (line) {
    let value

    try {
      value = JSON.parse(line)
    } catch (error) {
      this.emit('unknown', line, error)
      return
    }

    if (typeof value === 'boolean') {
      this.emit('unknown', line, 'Boolean value ignored')
      return
    }
    if (value === null) {
      this.emit('unknown', line, 'Null value ignored')
      return
    }
    if (typeof value !== 'object') {
      value = {
        data: value,
        time: setDateTimeString(value)
      }
    } else {
      if (value['@timestamp'] === undefined) {
        value.time = setDateTimeString(value)
      }
    }

    function setDateTimeString (value) {
      if (typeof value === 'object' && value.hasOwnProperty('time')) {
        if (
          (typeof value.time === 'string' && value.time.length) ||
            (typeof value.time === 'number' && value.time >= 0)
        ) {
          return new Date(value.time).toISOString()
        }
      }
      return new Date().toISOString()
    }
    return value
  }, { autoDestroy: true })

  const clientOpts = {
    node: opts.node,
    auth: opts.auth,
    cloud: opts.cloud,
    tls: { rejectUnauthorized: opts.rejectUnauthorized, ...opts.tls }
  }

  if (opts.caFingerprint) {
    clientOpts.caFingerprint = opts.caFingerprint
  }

  if (opts.Connection) {
    clientOpts.Connection = opts.Connection
  }

  if (opts.ConnectionPool) {
    clientOpts.ConnectionPool = opts.ConnectionPool
  }

  const client = new Client(clientOpts)

  client.diagnostic.on('resurrect', () => {
    initializeBulkHandler(opts, client, splitter)
  })

  initializeBulkHandler(opts, client, splitter)

  return splitter
}

module.exports = pinoElasticSearch
