# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.12.0] - 2020-01-02
### Added
- Support for browsers.
  Thrift can now be bundled with tools like Browserify and used in browser scripts,
  both for parsing IDL and generating binary payloads.
- All IDL files may be UTF-8.
  Previously, ThriftRW Node.js limited IDL to the 7 bit ASCII subset.
  The Go version of ThriftRW supports UTF-8 encoded Thrift IDL files by default.
  This change brings ThriftRW Node.js into parity.
  This affects the asynchronous filesystem API used by Thrift.load.
  readFile must accept an encoding argument.
### Fixed
- The `allowIncludeAlias` option previously only applied to the main Thrift module.
  It now applies to all transitively included modules.
  However, using this feature is ill-advised since no other Thrift
  implementation has provided this experimental feature and it would limit
  inter-language compatibility.

## [3.11.3] - 2018-10-04
### Changed
- Removes thrift include restrictions for relative paths only. All paths are considered
  by default relative to the thrift file. Note, thriftrw parser throw error if the code
  tries to include absolute paths.

## [3.11.2] - 2018-02-09
### Fixed
- Fixes a bug in encoding negative numbers expressed as plain JavaScript
  numbers with the i64 type with the js.type Long annotation.
  Previously, these would be encoded as negative in the low four bytes, and
  zeros in the high bytes, resulting in a large 32 bit positive number.

## [3.11.1] - 2017-05-26
### Fixed
- Propagate defaultAsUndefined to dependent Thrift constructors so that imported structs
  will respect the configuration of the root Thrift object.

## 3.11.0
### Fixed
- Fix constructor support for undefined default values. This allows either
  undefined or null to be used in the constructor.

## [3.10.0] - 2017-02-06
### Added
- Adds an `defaultAsUndefined` option to the Thrift constructor that causes
  the default for absent values to be `undefined` instead of `null`.
  This greatly abbreviates the result of JSON.stringify on structs with
  many absent keys.

## [3.9.0] - 2016-12-28
### Fixed
- Reverts a change to how PEGJS generates a Thrift IDL parser, disabling
  caching of intermediate nodes for back-tracking. This feature, while
  making parsing theoretically faster, caused production tests with many IDL
  files to bloat the heap and take minutes to run.

## [3.8.0] - 2016-10-18
### Added
- Thread annotations for individual enum definitions

## [3.7.0] - 2016-10-18
### Added
- Annotations are exposed on all type models and nodes of the syntax tree.
  (#135)

## [3.6.0] - 2016-10-06
### Added
- Support caching IDL AST as JSON.
### Fixed
- Fixes escapes in IDL strings.

## [3.5.0] - 2016-05-13
### Added
- Introduced an `allowOptionalArguments` flag that opts-in to
  the same semantics used by other ThriftRW libraries.
  That is, arguments are optional by default.
  Enabling this flag is backward-incompatible.
  Consult the README for details.
- A note regarding default values
- Add flag to allow optional arguments
- (c) 2016

## [3.4.3] - 2016-03-25
### Fixed
- Fixed support for maps with i8, i16, and i32 key types.
  i64 is not yet supported.
  string is the only other key type expressly supported.

## [3.4.2] - 2016-03-23
### Fixed
- Upgrade version of bufrw for a more rigorous fix for the regression
  introduced for lists of lists.
  The fix in bufrw should cover this and possibly other cases, and
  allows us to remove the work-around introduced in v3.4.1

## [3.4.1] - 2016-03-22
### Fixed
- Fix list of lists regression introduced in v3.2.0.

## [3.4.0] - 2016-03-04
### Added
- Implements Thrift message envelopes, including Thrift exceptions.
- Ships with pre-compiled IDL parser module and relaxes dependency on PEGJS to
  during development only.

## [3.3.0] - 2016-02-16
### Changed
- ThriftRW is now in its own organization on Github!
### Added
- Adds `toBuffer` and `fromBuffer` to `StructRW`.
- Allows i64 properties with the `(js.type = 'Date')` annotation to coerce
  arrays of bytes, buffers, and longs, all representing miliseconds since the
  Epoch.
### Fixed
- Fixes the missing `Argument` and `Result` constructors on function models.

## [3.2.0] - 2016-01-29
### Added
- Aliases byte as i8 in accordance with upstream Thrift changes.

## [3.1.0] - 2015-12-16
### Added
- Adds `thrift.getServiceEndpoints(service)`

## [3.0.3] - 2015-12-08
### Fixed
- Exposes the functions in parent services properly.

## [3.0.2] - 2015-12-01
- No change notes

## [3.0.1] - 2015-11-18
### Added
- Implement IDLs interface
- Implement preliminary benchmark
- Include and PascalCase notes added to README

## [3.0.0] - 2015-11-16
### Added
- Introduces Thrift includes.
  See [MIGRATION.md](MIGRATION.md) for details regarding changes to the public
  interface.

[3.12.0]: https://github.com/thriftrw/thriftrw-node/compare/3.11.3...3.12.0
[3.11.3]: https://github.com/thriftrw/thriftrw-node/compare/3.11.2...3.11.3
[3.11.2]: https://github.com/thriftrw/thriftrw-node/compare/3.11.1...3.11.2
[3.11.1]: https://github.com/thriftrw/thriftrw-node/compare/3.11.0...3.11.1
[3.11.0]: https://github.com/thriftrw/thriftrw-node/compare/3.10.0...3.11.0
[3.10.0]: https://github.com/thriftrw/thriftrw-node/compare/3.9.0...3.10.0
[3.9.0]: https://github.com/thriftrw/thriftrw-node/compare/3.8.0...3.9.0
[3.8.0]: https://github.com/thriftrw/thriftrw-node/compare/3.7.0...3.8.0
[3.7.0]: https://github.com/thriftrw/thriftrw-node/compare/3.6.0...3.7.0
[3.6.0]: https://github.com/thriftrw/thriftrw-node/compare/3.5.0...3.6.0
[3.5.0]: https://github.com/thriftrw/thriftrw-node/compare/3.4.3...3.5.0
[3.4.3]: https://github.com/thriftrw/thriftrw-node/compare/3.4.2...3.4.3
[3.4.2]: https://github.com/thriftrw/thriftrw-node/compare/3.4.1...3.4.2
[3.4.1]: https://github.com/thriftrw/thriftrw-node/compare/3.4.0...3.4.1
[3.4.0]: https://github.com/thriftrw/thriftrw-node/compare/3.3.0...3.4.0
[3.3.0]: https://github.com/thriftrw/thriftrw-node/compare/3.2.0...3.3.0
[3.2.0]: https://github.com/thriftrw/thriftrw-node/compare/3.1.0...3.2.0
[3.1.0]: https://github.com/thriftrw/thriftrw-node/compare/3.0.3...3.1.0
[3.0.3]: https://github.com/thriftrw/thriftrw-node/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/thriftrw/thriftrw-node/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/thriftrw/thriftrw-node/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/thriftrw/thriftrw-node/compare/2.5.4...3.0.0
