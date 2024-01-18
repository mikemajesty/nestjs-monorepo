'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// Copyright (c) 2018 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License
// is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing permissions and limitations under
// the License.

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var URL = _interopRequireWildcard(_url);

var _thriftrw = require('thriftrw');

var _logger = require('../logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _sender_utils = require('./sender_utils.js');

var _sender_utils2 = _interopRequireDefault(_sender_utils);

var _thrift = require('../thrift.js');

var _thrift2 = _interopRequireDefault(_thrift);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PATH = '/api/traces';
var DEFAULT_PORT = 14268;
var DEFAULT_TIMEOUT_MS = 5000;
var DEFAULT_MAX_SPAN_BATCH_SIZE = 100;

var HTTPSender = function () {
  function HTTPSender() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HTTPSender);

    this._url = URL.parse(options.endpoint);
    this._username = options.username;
    this._password = options.password;
    this._timeoutMs = options.timeoutMs || options.timeoutMS || DEFAULT_TIMEOUT_MS;
    this._httpAgent = this._url.protocol === 'https:' ? new _https2.default.Agent({ keepAlive: true }) : new _http2.default.Agent({ keepAlive: true });

    this._maxSpanBatchSize = options.maxSpanBatchSize || DEFAULT_MAX_SPAN_BATCH_SIZE;

    this._logger = options.logger || new _logger2.default();
    this._jaegerThrift = new _thriftrw.Thrift({
      source: _thrift2.default.loadJaegerThriftDefinition(),
      allowOptionalArguments: true
    });

    this._httpOptions = {
      protocol: this._url.protocol,
      hostname: this._url.hostname,
      port: this._url.port,
      path: this._url.pathname,
      method: 'POST',
      auth: this._username && this._password ? this._username + ':' + this._password : undefined,
      headers: {
        'Content-Type': 'application/x-thrift',
        Connection: 'keep-alive'
      },
      agent: this._httpAgent,
      timeout: this._timeoutMs
    };
  }

  _createClass(HTTPSender, [{
    key: 'setProcess',
    value: function setProcess(process) {
      // Go ahead and initialize the Thrift batch that we will reuse for each
      // flush.
      this._batch = new this._jaegerThrift.Batch({
        process: _sender_utils2.default.convertProcessToThrift(this._jaegerThrift, process),
        spans: []
      });
    }
  }, {
    key: 'append',
    value: function append(span, callback) {
      this._batch.spans.push(new this._jaegerThrift.Span(span));

      if (this._batch.spans.length >= this._maxSpanBatchSize) {
        this.flush(callback);
        return;
      }
      _sender_utils2.default.invokeCallback(callback, 0);
    }
  }, {
    key: 'flush',
    value: function flush(callback) {
      var _this = this;

      var numSpans = this._batch.spans.length;
      if (!numSpans) {
        _sender_utils2.default.invokeCallback(callback, 0);
        return;
      }

      var result = this._jaegerThrift.Batch.rw.toBuffer(this._batch);
      this._reset(); // clear buffer for new spans, even if Thrift conversion fails

      if (result.err) {
        _sender_utils2.default.invokeCallback(callback, numSpans, 'Error encoding Thrift batch: ' + result.err);
        return;
      }

      var requester = this._url.protocol === 'https:' ? _https2.default.request : _http2.default.request;

      var req = requester(this._httpOptions, function (resp) {
        // consume response data to free up memory
        resp.resume();

        var error = void 0;
        if (resp.statusCode >= 400) {
          error = 'error sending spans over HTTP: server responded with HTTP ' + resp.statusCode;
          _this._logger.error(error);
        }

        _sender_utils2.default.invokeCallback(callback, numSpans, error);
      });

      req.on('error', function (err) {
        var error = 'error sending spans over HTTP: ' + err;
        _this._logger.error(error);
        _sender_utils2.default.invokeCallback(callback, numSpans, error);
      });
      req.write(result.value);
      req.end();
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this._batch.spans = [];
    }
  }, {
    key: 'close',
    value: function close() {
      // Older node versions don't have this.
      if (this._httpAgent.destroy) {
        this._httpAgent.destroy();
      }
    }
  }]);

  return HTTPSender;
}();

exports.default = HTTPSender;
//# sourceMappingURL=http_sender.js.map