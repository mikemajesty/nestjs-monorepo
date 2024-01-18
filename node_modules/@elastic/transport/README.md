<img align="right" width="auto" height="auto" src="https://www.elastic.co/static-res/images/elastic-logo-200.png">

# Elastic Node.js Transport

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Node CI](https://github.com/elastic/elastic-transport-js/actions/workflows/nodejs.yml/badge.svg)](https://github.com/elastic/elastic-transport-js/actions/workflows/nodejs.yml) [![codecov](https://codecov.io/gh/elastic/elastic-transport-js/branch/master/graph/badge.svg?token=4CU5AeB3FW)](https://codecov.io/gh/elastic/elastic-transport-js) [![NPM downloads](https://img.shields.io/npm/dm/@elastic/transport.svg?style=flat)](https://www.npmjs.com/package/@elastic/transport)

This is a HTTP transport Node.js library for communicate with [Elastic](http://elastic.co/) products,
like [Elasticsearch](https://github.com/elastic/elasticsearch).

## Install
```
npm install @elastic/transport
```

### Node.js support

NOTE: The minimum supported version of Node.js is `v16`.

The client versioning follows the Elastc Stack versioning, this means that
major, minor, and patch releases are done following a precise schedule that
often does not coincide with the [Node.js release](https://nodejs.org/en/about/releases/) times.

To avoid support insecure and unsupported versions of Node.js, the
client **will drop the support of EOL versions of Node.js between minor releases**.
Typically, as soon as a Node.js version goes into EOL, the client will continue
to support that version for at least another minor release.

Unless you are **always** using a supported version of Node.js, 
we recommend defining the client dependency in your
`package.json` with the `~` instead of `^`. In this way, you will lock the
dependency on the minor release and not the major. (for example, `~7.10.0` instead
of `^7.10.0`).

| Node.js Version | Node.js EOL date | End of support         |
| --------------- |------------------| ---------------------- |
| `8.x`           | `December 2019`  | `7.11` (early 2021)    |       
| `10.x`          | `April 2021`     | `7.12` (mid 2021)      |
| `12.x`          | `April 2022`     | `8.2` (early 2022)     |
| `14.x`          | `April 2023`     | `8.8` (early 2023)     | 

## API

## Usage

## License

This software is licensed under the [Apache 2 license](./LICENSE).
