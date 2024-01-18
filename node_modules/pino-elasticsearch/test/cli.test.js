'use strict'
const test = require('tap').test
const proxyquire = require('proxyquire')

test('CLI: arg node should passed to client constructor', async (t) => {
  const cli = proxyquire('../cli.js', {
    pump: () => { },
    './lib.js': (opts) => {
      t.same(opts, { node: 'https://custom-node-url:9999' })
      return {
        on: () => { }
      }
    }
  })

  cli({ node: 'https://custom-node-url:9999' })
})

test('CLI: arg rejectUnauthorized, if set to \'true\', should passed as true (bool) to client constructor', async (t) => {
  const cli = proxyquire('../cli.js', {
    pump: () => { },
    './lib.js': (opts) => {
      t.same(opts, {
        node: 'https://custom-node-url:9999',
        rejectUnauthorized: true
      })
      return {
        on: () => { }
      }
    }
  })

  cli({
    node: 'https://custom-node-url:9999',
    rejectUnauthorized: 'true'
  })
})

test('CLI: arg rejectUnauthorized, if set to \'false\', should passed as false (bool) to client constructor', async (t) => {
  const cli = proxyquire('../cli.js', {
    pump: () => { },
    './lib.js': (opts) => {
      t.same(opts, {
        node: 'https://custom-node-url:9999',
        rejectUnauthorized: false
      })
      return {
        on: () => { }
      }
    }
  })

  cli({
    node: 'https://custom-node-url:9999',
    rejectUnauthorized: 'false'
  })
})

test('CLI: arg rejectUnauthorized, if set to anything instead of true or false, should passed as true (bool) to client constructor', async (t) => {
  const cli = proxyquire('../cli.js', {
    pump: () => { },
    './lib.js': (opts) => {
      t.same(opts, {
        node: 'https://custom-node-url:9999',
        rejectUnauthorized: true
      })
      return {
        on: () => { }
      }
    }
  })

  cli({
    node: 'https://custom-node-url:9999',
    rejectUnauthorized: 'anything'
  })
})

test('CLI: if arg.read-config is set, should read the config file and passed the value (only allowed values)', async (t) => {
  const cli = proxyquire('../cli.js', {
    pump: () => { },
    './lib.js': (opts) => {
      t.same(opts, {
        index: 'custom-index',
        node: 'https://127.0.0.1:9200',
        rejectUnauthorized: false,
        auth: {
          username: 'elastic',
          password: 'pass'
        },
        // some keys are redundant, it is intended as it is.
        // (see function start() in cli.js)
        'read-config': 'test/exampleConfig.js',
        username: 'elastic',
        password: 'pass'
      })
      return {
        on: () => { }
      }
    }
  })

  cli({
    node: 'https://custom-node-url:9999',
    'read-config': 'test/exampleConfig.js'
  })
})
