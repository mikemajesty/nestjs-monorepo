'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// Copyright (c) 2016 Uber Technologies, Inc.
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

var _logger = require('../logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _thrift = require('../thrift.js');

var _thrift2 = _interopRequireDefault(_thrift);

var _metrics = require('../metrics/metrics.js');

var _metrics2 = _interopRequireDefault(_metrics);

var _metric_factory = require('../metrics/noop/metric_factory');

var _metric_factory2 = _interopRequireDefault(_metric_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_BUFFER_FLUSH_INTERVAL_MILLIS = 1000;

var RemoteReporter = function () {
  function RemoteReporter(sender) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RemoteReporter);

    this._appendCallback = function (numSpans, err) {
      if (err) {
        _this._logger.error('Failed to append spans in reporter: ' + err);
        _this._metrics.reporterDropped.increment(numSpans);
      } else {
        _this._metrics.reporterSuccess.increment(numSpans);
      }
    };

    if (!sender) {
      throw new Error('RemoteReporter must be given a Sender.');
    }

    this._bufferFlushInterval = options.bufferFlushInterval || DEFAULT_BUFFER_FLUSH_INTERVAL_MILLIS;
    this._logger = options.logger || new _logger2.default();
    this._sender = sender;
    this._intervalHandle = setInterval(function () {
      _this.flush();
    }, this._bufferFlushInterval);
    this._metrics = options.metrics || new _metrics2.default(new _metric_factory2.default());
  }

  _createClass(RemoteReporter, [{
    key: 'name',
    value: function name() {
      return 'RemoteReporter';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name();
    }
  }, {
    key: 'report',
    value: function report(span) {
      var thriftSpan = _thrift2.default.spanToThrift(span);
      this._sender.append(thriftSpan, this._appendCallback);
    }
  }, {
    key: '_invokeCallback',
    value: function _invokeCallback(callback) {
      if (callback) {
        callback();
      }
    }
  }, {
    key: 'flush',
    value: function flush(callback) {
      var _this2 = this;

      if (this._process === undefined) {
        this._logger.error('Failed to flush since process is not set.');
        this._invokeCallback(callback);
        return;
      }
      this._sender.flush(function (numSpans, err) {
        if (err) {
          _this2._logger.error('Failed to flush spans in reporter: ' + err);
          _this2._metrics.reporterFailure.increment(numSpans);
        } else {
          _this2._metrics.reporterSuccess.increment(numSpans);
        }
        _this2._invokeCallback(callback);
      });
    }
  }, {
    key: 'close',
    value: function close(callback) {
      var _this3 = this;

      clearInterval(this._intervalHandle);
      this.flush(function () {
        _this3._sender.close();
        _this3._invokeCallback(callback);
      });
    }
  }, {
    key: 'setProcess',
    value: function setProcess(serviceName, tags) {
      this._process = {
        serviceName: serviceName,
        tags: _thrift2.default.getThriftTags(tags)
      };

      this._sender.setProcess(this._process);
    }
  }]);

  return RemoteReporter;
}();

exports.default = RemoteReporter;
//# sourceMappingURL=remote_reporter.js.map