'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) 2016 Uber Technologies, Inc.
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

var _const_sampler = require('./samplers/const_sampler');

var _const_sampler2 = _interopRequireDefault(_const_sampler);

var _probabilistic_sampler = require('./samplers/probabilistic_sampler');

var _probabilistic_sampler2 = _interopRequireDefault(_probabilistic_sampler);

var _rate_limiting_sampler = require('./samplers/rate_limiting_sampler');

var _rate_limiting_sampler2 = _interopRequireDefault(_rate_limiting_sampler);

var _remote_reporter = require('./reporters/remote_reporter');

var _remote_reporter2 = _interopRequireDefault(_remote_reporter);

var _composite_reporter = require('./reporters/composite_reporter');

var _composite_reporter2 = _interopRequireDefault(_composite_reporter);

var _logging_reporter = require('./reporters/logging_reporter');

var _logging_reporter2 = _interopRequireDefault(_logging_reporter);

var _remote_sampler = require('./samplers/remote_sampler');

var _remote_sampler2 = _interopRequireDefault(_remote_sampler);

var _metrics = require('./metrics/metrics');

var _metrics2 = _interopRequireDefault(_metrics);

var _tracer = require('./tracer');

var _tracer2 = _interopRequireDefault(_tracer);

var _udp_sender = require('./reporters/udp_sender');

var _udp_sender2 = _interopRequireDefault(_udp_sender);

var _http_sender = require('./reporters/http_sender');

var _http_sender2 = _interopRequireDefault(_http_sender);

var _opentracing = require('opentracing');

var opentracing = _interopRequireWildcard(_opentracing);

var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

var _remote_throttler = require('./throttler/remote_throttler');

var _remote_throttler2 = _interopRequireDefault(_remote_throttler);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jaegerSchema = {
  id: '/jaeger',
  type: 'object',
  properties: {
    serviceName: { type: 'string' },
    disable: { type: 'boolean' },
    sampler: {
      properties: {
        type: { type: 'string' },
        param: { type: 'number' },
        hostPort: { type: 'string' },
        host: { type: 'string' },
        port: { type: 'number' },
        samplingPath: { type: 'string' },
        refreshIntervalMs: { type: 'number' }
      },
      required: ['type', 'param'],
      additionalProperties: false
    },
    reporter: {
      properties: {
        logSpans: { type: 'boolean' },
        agentHost: { type: 'string' },
        agentPort: { type: 'number' },
        agentSocketType: { type: 'string' },
        collectorEndpoint: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        flushIntervalMs: { type: 'number' },
        timeoutMs: { type: 'number' }
      },
      additionalProperties: false
    },
    throttler: {
      properties: {
        host: { type: 'string' },
        port: { type: 'number' },
        refreshIntervalMs: { type: 'number' }
      },
      additionalProperties: false
    }
  }
};

var Configuration = function () {
  function Configuration() {
    _classCallCheck(this, Configuration);
  }

  _createClass(Configuration, null, [{
    key: '_getSampler',
    value: function _getSampler(config, options) {
      var type = config.sampler.type;
      var param = config.sampler.param;
      var hostPort = config.sampler.hostPort;
      var host = config.sampler.host;
      var port = config.sampler.port;
      var samplingPath = config.sampler.samplingPath;
      var refreshIntervalMs = config.sampler.refreshIntervalMs;

      if (typeof param !== 'number') {
        throw new Error('Expecting sampler.param to be a number. Received ' + param);
      }

      var sampler = void 0;
      if (type === constants.SAMPLER_TYPE_PROBABILISTIC) {
        sampler = new _probabilistic_sampler2.default(param);
      }

      if (type === constants.SAMPLER_TYPE_RATE_LIMITING) {
        sampler = new _rate_limiting_sampler2.default(param);
      }

      if (type === constants.SAMPLER_TYPE_CONST) {
        sampler = new _const_sampler2.default(param === 1);
      }

      if (type === constants.SAMPLER_TYPE_REMOTE) {
        sampler = new _remote_sampler2.default(config.serviceName, {
          sampler: new _probabilistic_sampler2.default(param),
          hostPort: hostPort,
          host: host,
          port: port,
          samplingPath: samplingPath,
          refreshInterval: refreshIntervalMs,
          metrics: options.metrics,
          logger: options.logger
        });
      }

      return sampler;
    }
  }, {
    key: '_getReporter',
    value: function _getReporter(config, options) {
      var reporterConfig = {};
      var reporters = [];
      var isHTTPSender = false;
      var senderConfig = {
        logger: options.logger
      };
      if (config.reporter) {
        if (config.reporter.logSpans) {
          reporters.push(new _logging_reporter2.default(options.logger));
        }

        if (config.reporter.flushIntervalMs) {
          reporterConfig['bufferFlushInterval'] = config.reporter.flushIntervalMs;
        }

        if (config.reporter.collectorEndpoint) {
          isHTTPSender = true;

          senderConfig['endpoint'] = config.reporter.collectorEndpoint;

          if (config.reporter.username) {
            senderConfig['username'] = config.reporter.username;
          }
          if (config.reporter.password) {
            senderConfig['password'] = config.reporter.password;
          }
          if (config.reporter.timeoutMs) {
            senderConfig['timeoutMs'] = config.reporter.timeoutMs;
          }
        }
        if (config.reporter.agentHost) {
          senderConfig['host'] = config.reporter.agentHost;
        }

        if (config.reporter.agentPort) {
          senderConfig['port'] = config.reporter.agentPort;
        }

        if (config.reporter.agentSocketType) {
          senderConfig['socketType'] = config.reporter.agentSocketType;
        }
      }
      reporterConfig['metrics'] = options.metrics;
      reporterConfig['logger'] = options.logger;
      var sender = isHTTPSender ? new _http_sender2.default(senderConfig) : new _udp_sender2.default(senderConfig);
      var remoteReporter = new _remote_reporter2.default(sender, reporterConfig);
      if (reporters.length == 0) {
        return remoteReporter;
      }
      reporters.push(remoteReporter);
      return new _composite_reporter2.default(reporters);
    }
  }, {
    key: '_getThrottler',
    value: function _getThrottler(config, options) {
      var throttlerOptions = _util2.default.clone(config.throttler);
      if (options.logger) {
        throttlerOptions.logger = options.logger;
      }
      if (options.metrics) {
        throttlerOptions.metrics = options.metrics;
      }
      return new _remote_throttler2.default(config.serviceName, throttlerOptions);
    }

    /**
     * Initialize and return a new instance of Jaeger Tracer.
     *
     * The config dictionary is not validated for adherence to the schema above.
     * Such validation can be performed like this:
     *
     *     import {Validator} from 'jsonschema';
     *
     *     let v = new Validator();
     *     v.validate(config, jaegerSchema, {
     *       throwError: true
     *     });
     *
     * @param {Object} config - configuration matching the jaegerSchema definition.
     * @param {Object} options - options
     * @param {Object} [options.reporter] - if provided, this reporter will be used.
     *        Otherwise a new reporter will be created according to the description
     *        in the config.
     * @param {Object} [options.throttler] - if provided, this throttler will be used.
     *        Otherwise a new throttler will be created according to the description
     *        in the config.
     * @param {Object} [options.metrics] - a metrics factory (see ./_flow/metrics.js)
     * @param {Object} [options.logger] - a logger (see ./_flow/logger.js)
     * @param {Object} [options.tags] - set of key-value pairs which will be set
     *        as process-level tags on the Tracer itself.
     * @param {boolean} [options.traceId128bit] - generate root span with a 128bit traceId.
     * @param {boolean} [options.shareRpcSpan] - Share the same span for rpc span_kind.
     */

  }, {
    key: 'initTracer',
    value: function initTracer(config) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var reporter = void 0;
      var sampler = void 0;
      var throttler = void 0;
      if (options.metrics) {
        options.metrics = new _metrics2.default(options.metrics);
      }
      if (config.disable) {
        return new opentracing.Tracer();
      }
      if (!config.serviceName) {
        throw new Error('config.serviceName must be provided');
      }
      if (config.sampler) {
        sampler = Configuration._getSampler(config, options);
      } else {
        sampler = new _remote_sampler2.default(config.serviceName, options);
      }
      if (!options.reporter) {
        reporter = Configuration._getReporter(config, options);
      } else {
        reporter = options.reporter;
      }
      if (!options.throttler) {
        if (config.throttler) {
          throttler = Configuration._getThrottler(config, options);
        }
      } else {
        throttler = options.throttler;
      }

      if (options.logger) {
        options.logger.info('Initializing Jaeger Tracer with ' + reporter + ' and ' + sampler);
      }

      return new _tracer2.default(config.serviceName, reporter, sampler, {
        contextKey: options.contextKey,
        baggagePrefix: options.baggagePrefix,
        metrics: options.metrics,
        logger: options.logger,
        tags: options.tags,
        traceId128bit: options.traceId128bit,
        shareRpcSpan: options.shareRpcSpan,
        debugThrottler: throttler
      });
    }
  }]);

  return Configuration;
}();

exports.default = Configuration;
//# sourceMappingURL=configuration.js.map