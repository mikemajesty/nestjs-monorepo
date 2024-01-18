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

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _constants = require('./constants');

var _adapt_sampler = require('./_adapt_sampler');

var _probabilistic_sampler = require('./probabilistic_sampler');

var _probabilistic_sampler2 = _interopRequireDefault(_probabilistic_sampler);

var _rate_limiting_sampler = require('./rate_limiting_sampler');

var _rate_limiting_sampler2 = _interopRequireDefault(_rate_limiting_sampler);

var _per_operation_sampler = require('./per_operation_sampler');

var _per_operation_sampler2 = _interopRequireDefault(_per_operation_sampler);

var _metrics = require('../metrics/metrics');

var _metrics2 = _interopRequireDefault(_metrics);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _metric_factory = require('../metrics/noop/metric_factory');

var _metric_factory2 = _interopRequireDefault(_metric_factory);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_INITIAL_SAMPLING_RATE = 0.001;
var DEFAULT_REFRESH_INTERVAL = 60000;
var DEFAULT_MAX_OPERATIONS = 2000;
var DEFAULT_SAMPLING_HOST = '0.0.0.0';
var DEFAULT_SAMPLING_PORT = 5778;
var DEFAULT_SAMPLING_PATH = '/sampling';
var PROBABILISTIC_STRATEGY_TYPE = 'PROBABILISTIC';
var RATE_LIMITING_STRATEGY_TYPE = 'RATE_LIMITING';

var RemoteControlledSampler = function () {

  /**
   * Creates a sampler remotely controlled by jaeger-agent.
   *
   * @param {string} [serviceName] - name of the current service / application, same as given to Tracer
   * @param {object} [options] - optional settings
   * @param {object} [options.sampler] - initial sampler to use prior to retrieving strategies from Agent
   * @param {object} [options.logger] - optional logger, see _flow/logger.js
   * @param {object} [options.metrics] - instance of Metrics object
   * @param {number} [options.refreshInterval] - interval in milliseconds before sampling strategy refreshes (0 to not refresh)
   * @param {string} [options.hostPort] - host and port for jaeger-agent, defaults to 'localhost:5778'
   * @param {string} [options.host] - host for jaeger-agent, defaults to 'localhost'
   * @param {number} [options.port] - port for jaeger-agent for SamplingManager endpoint
   * @param {string} [options.samplingPath] - path on jaeger-agent for SamplingManager endpoint
   * @param {number} [options.maxOperations] - max number of operations to track in PerOperationSampler
   * @param {function} [options.onSamplerUpdate]
   */
  function RemoteControlledSampler(serviceName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RemoteControlledSampler);

    this.apiVersion = _constants.SAMPLER_API_V2;

    this._serviceName = serviceName;
    this._sampler = (0, _adapt_sampler.adaptSamplerOrThrow)(options.sampler || new _probabilistic_sampler2.default(DEFAULT_INITIAL_SAMPLING_RATE));
    this._logger = options.logger || new _logger2.default();
    this._metrics = options.metrics || new _metrics2.default(new _metric_factory2.default());
    this._refreshInterval = options.refreshInterval || DEFAULT_REFRESH_INTERVAL;
    this._maxOperations = options.maxOperations || DEFAULT_MAX_OPERATIONS;
    if (options.hostPort) {
      this._parseHostPort(options.hostPort);
    } else {
      this._host = options.host || DEFAULT_SAMPLING_HOST;
      this._port = options.port || DEFAULT_SAMPLING_PORT;
    }
    this._samplingPath = options.samplingPath || DEFAULT_SAMPLING_PATH;
    this._onSamplerUpdate = options.onSamplerUpdate;

    if (options.refreshInterval !== 0) {
      var randomDelay = Math.random() * this._refreshInterval;
      this._initialDelayTimeoutHandle = setTimeout(this._afterInitialDelay.bind(this), randomDelay);
    }
  }

  _createClass(RemoteControlledSampler, [{
    key: 'name',
    value: function name() {
      return 'RemoteSampler';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name() + '(serviceName=' + this._serviceName + ')';
    }
  }, {
    key: '_parseHostPort',
    value: function _parseHostPort(hostPort) {
      hostPort = /^http/.test(hostPort) ? hostPort : 'http://' + hostPort;
      var parsedUrl = _url2.default.parse(hostPort);

      this._host = parsedUrl.hostname || DEFAULT_SAMPLING_HOST;
      this._port = parsedUrl.port ? parseInt(parsedUrl.port) : DEFAULT_SAMPLING_PORT;
    }
  }, {
    key: '_afterInitialDelay',
    value: function _afterInitialDelay() {
      this._refreshIntervalHandle = setInterval(this._refreshSamplingStrategy.bind(this), this._refreshInterval);
      this._initialDelayTimeoutHandle = null;
    }
  }, {
    key: '_refreshSamplingStrategy',
    value: function _refreshSamplingStrategy() {
      var _this = this;

      var serviceName = encodeURIComponent(this._serviceName);
      var success = function success(body) {
        _this._handleSamplingServerResponse(body);
      };
      var error = function error(err) {
        _this._logger.error('Error in fetching sampling strategy: ' + err + '.');
        _this._metrics.samplerQueryFailure.increment(1);
      };
      _util2.default.httpGet(this._host, this._port, this._samplingPath + '?service=' + serviceName, success, error);
    }
  }, {
    key: '_handleSamplingServerResponse',
    value: function _handleSamplingServerResponse(body) {
      this._metrics.samplerRetrieved.increment(1);
      var strategy = void 0;
      try {
        strategy = JSON.parse(body);
        if (!strategy) {
          throw 'Malformed response: ' + body;
        }
      } catch (error) {
        this._logger.error('Error in parsing sampling strategy: ' + error + '.');
        this._metrics.samplerUpdateFailure.increment(1);
        return;
      }
      try {
        if (this._updateSampler(strategy)) {
          this._metrics.samplerUpdated.increment(1);
        }
      } catch (error) {
        this._logger.error('Error in updating sampler: ' + error + '.');
        this._metrics.samplerUpdateFailure.increment(1);
        return;
      }
      if (this._onSamplerUpdate) {
        this._onSamplerUpdate(this._sampler);
      }
    }
  }, {
    key: '_updateSampler',
    value: function _updateSampler(response) {
      if (response.operationSampling) {
        if (this._sampler instanceof _per_operation_sampler2.default) {
          var sampler = this._sampler;
          return sampler.update(response.operationSampling);
        }
        this._sampler = new _per_operation_sampler2.default(response.operationSampling, this._maxOperations);
        return true;
      }
      if (response.strategyType === PROBABILISTIC_STRATEGY_TYPE && response.probabilisticSampling) {
        var samplingRate = response.probabilisticSampling.samplingRate;
        if (this._sampler instanceof _probabilistic_sampler2.default) {
          return this._sampler.update(samplingRate);
        }
        this._sampler = new _probabilistic_sampler2.default(samplingRate);
        return true;
      }
      if (response.strategyType === RATE_LIMITING_STRATEGY_TYPE && response.rateLimitingSampling) {
        var maxTracesPerSecond = response.rateLimitingSampling.maxTracesPerSecond;
        if (this._sampler instanceof _rate_limiting_sampler2.default) {
          var _sampler = this._sampler;
          return _sampler.update(maxTracesPerSecond);
        }
        this._sampler = new _rate_limiting_sampler2.default(maxTracesPerSecond);
        return true;
      }

      throw 'Malformed response: ' + JSON.stringify(response);
    }
  }, {
    key: 'onCreateSpan',
    value: function onCreateSpan(span) {
      return this._sampler.onCreateSpan(span);
    }
  }, {
    key: 'onSetOperationName',
    value: function onSetOperationName(span, operationName) {
      return this._sampler.onSetOperationName(span, operationName);
    }
  }, {
    key: 'onSetTag',
    value: function onSetTag(span, key, value) {
      return this._sampler.onSetTag(span, key, value);
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

  return RemoteControlledSampler;
}();

exports.default = RemoteControlledSampler;
//# sourceMappingURL=remote_sampler.js.map