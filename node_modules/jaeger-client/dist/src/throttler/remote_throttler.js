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

var _metrics = require('../metrics/metrics.js');

var _metrics2 = _interopRequireDefault(_metrics);

var _logger = require('../logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _metric_factory = require('../metrics/noop/metric_factory');

var _metric_factory2 = _interopRequireDefault(_metric_factory);

var _util = require('../util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_REFRESH_INTERVAL_MS = 5000;
var DEFAULT_INITIAL_DELAY_MS = 5000;
var DEFAULT_THROTTLER_HOST = '0.0.0.0';
var DEFAULT_THROTTLER_PORT = 5778;

// UNIT_CREDIT is the minimum amount of credits necessary to not be throttled.
// i.e. if currentCredits > UNIT_CREDIT, then the operation will not be throttled.
var UNIT_CREDIT = 1.0;

var RemoteThrottler = function () {

  /**
   * Creates a RemoteThrottler that fetches credits remotely from jaeger-agent.
   *
   * @param {string} [serviceName] - name of the current service / application, same as given to Tracer
   * @param {object} [options] - optional settings
   * @param {object} [options.logger] - optional logger, see _flow/logger.js
   * @param {object} [options.metrics] - instance of Metrics object
   * @param {number} [options.refreshIntervalMs] - interval in milliseconds that determines how often credits
   * are fetched
   * @param {number} [options.initialDelayMs] - interval in milliseconds that determines how soon after initialization
   * credits are first fetched
   * @param {string} [options.host] - host for jaeger-agent, defaults to 'localhost'
   * @param {number} [options.port] - port for jaeger-agent for /credits endpoint
   * @param {function} [options.onCreditsUpdate] - callback function once credits are updated. Used for testing.
   */
  function RemoteThrottler(serviceName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RemoteThrottler);

    this._serviceName = serviceName;
    this._logger = options.logger || new _logger2.default();
    this._metrics = options.metrics || new _metrics2.default(new _metric_factory2.default());
    this._refreshIntervalMs = options.refreshIntervalMs || DEFAULT_REFRESH_INTERVAL_MS;
    this._host = options.host || DEFAULT_THROTTLER_HOST;
    this._port = options.port || DEFAULT_THROTTLER_PORT;

    this._credits = {};
    this._onCreditsUpdate = options.onCreditsUpdate;

    this._initialDelayTimeoutHandle = setTimeout(this._afterInitialDelay.bind(this), options.initialDelayMs || DEFAULT_INITIAL_DELAY_MS);
  }

  _createClass(RemoteThrottler, [{
    key: '_afterInitialDelay',
    value: function _afterInitialDelay() {
      this._refreshCredits();
      this._refreshIntervalHandle = setInterval(this._refreshCredits.bind(this), this._refreshIntervalMs);
      this._initialDelayTimeoutHandle = null;
    }
  }, {
    key: 'setProcess',
    value: function setProcess(process) {
      this._uuid = process.uuid || '';
    }
  }, {
    key: 'isAllowed',
    value: function isAllowed(operation) {
      if (operation in this._credits) {
        return this._isAllowed(operation);
      }
      // Credits for the operation will be asynchronously fetched
      this._credits[operation] = 0;
      this._metrics.throttledDebugSpans.increment(1);
      return false;
    }
  }, {
    key: '_isAllowed',
    value: function _isAllowed(operation) {
      var credits = this._credits[operation] || 0;
      if (credits < UNIT_CREDIT) {
        this._metrics.throttledDebugSpans.increment(1);
        return false;
      }
      this._credits[operation] = credits - UNIT_CREDIT;
      return true;
    }
  }, {
    key: '_refreshCredits',
    value: function _refreshCredits() {
      if (!this._uuid) {
        this._logger.error('UUID must be set to fetch credits');
        return;
      }
      var keys = Object.keys(this._credits);
      if (keys.length === 0) {
        // No point fetching credits if there's no operations to fetch
        return;
      }
      this._fetchCredits(keys);
    }
  }, {
    key: '_incrementCredits',
    value: function _incrementCredits(creditResponses) {
      var _this = this;

      creditResponses.forEach(function (r) {
        _this._credits[r.operation] = _this._credits[r.operation] + r.balance;
      });
    }
  }, {
    key: '_fetchCredits',
    value: function _fetchCredits(operations) {
      var _this2 = this;

      var serviceName = encodeURIComponent(this._serviceName);
      var uuid = encodeURIComponent(this._uuid);
      var ops = operations.map(encodeURIComponent).join('&operations=');
      var url = '/credits?service=' + serviceName + '&uuid=' + uuid + '&operations=' + ops;

      var success = function success(body) {
        _this2._parseCreditResponse(body);
      };
      var error = function error(err) {
        _this2._logger.error('Error in fetching credits: ' + err + '.');
        _this2._metrics.throttlerUpdateFailure.increment(1);
      };
      _util2.default.httpGet(this._host, this._port, url, success, error);
    }
  }, {
    key: '_parseCreditResponse',
    value: function _parseCreditResponse(body) {
      var creditResponses = void 0;
      try {
        creditResponses = JSON.parse(body);
      } catch (error) {
        this._logger.error('Error in parsing credit response: ' + error + '.');
        this._metrics.throttlerUpdateFailure.increment(1);
        return;
      }
      try {
        this._incrementCredits(creditResponses.balances);
        this._metrics.throttlerUpdateSuccess.increment(1);
      } catch (error) {
        this._logger.error('Error in updating credits: ' + error + '.');
        this._metrics.throttlerUpdateFailure.increment(1);
        return;
      }
      if (this._onCreditsUpdate) {
        this._onCreditsUpdate(this);
      }
    }
  }, {
    key: 'close',
    value: function close(callback) {
      clearTimeout(this._initialDelayTimeoutHandle);
      clearInterval(this._refreshIntervalHandle);

      if (callback) {
        callback();
      }
    }
  }]);

  return RemoteThrottler;
}();

exports.default = RemoteThrottler;
//# sourceMappingURL=remote_throttler.js.map