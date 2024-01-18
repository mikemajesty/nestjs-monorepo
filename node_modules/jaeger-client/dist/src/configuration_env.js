'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) 2018 Jaeger Author.
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

var _configuration = require('./configuration.js');

var _configuration2 = _interopRequireDefault(_configuration);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deprecatedEnvVars = {
  JAEGER_SAMPLER_HOST: 'JAEGER_SAMPLER_MANAGER_HOST_PORT',
  JAEGER_SAMPLER_PORT: 'JAEGER_SAMPLER_MANAGER_HOST_PORT',
  JAEGER_REPORTER_ENDPOINT: 'JAEGER_ENDPOINT',
  JAEGER_REPORTER_USER: 'JAEGER_USER',
  JAEGER_REPORTER_PASSWORD: 'JAEGER_PASSWORD',
  JAEGER_REPORTER_AGENT_HOST: 'JAEGER_AGENT_HOST',
  JAEGER_REPORTER_AGENT_PORT: 'JAEGER_AGENT_PORT',
  JAEGER_DISABLE: 'JAEGER_DISABLED'
};

var ConfigurationEnv = function () {
  function ConfigurationEnv() {
    _classCallCheck(this, ConfigurationEnv);
  }

  _createClass(ConfigurationEnv, null, [{
    key: '_validateEnv',
    value: function _validateEnv() {
      Object.keys(deprecatedEnvVars).forEach(function (env) {
        if (process.env[env]) {
          console.warn('You are using deprecated env variable ' + env + '. Use ' + deprecatedEnvVars[env] + ' instead. \nDeprecated env variable will be removed in the next major release (4.x.x)');
        }
      });
    }
  }, {
    key: '_getConfigValue',
    value: function _getConfigValue(obj, key, defaultValue) {
      return obj && key in obj ? obj[key] : defaultValue;
    }
  }, {
    key: '_getSamplerFromEnv',
    value: function _getSamplerFromEnv(config) {
      var samplerConfig = {};
      var value = ConfigurationEnv._getConfigValue(config.sampler, 'type', process.env.JAEGER_SAMPLER_TYPE);
      if (value) {
        samplerConfig.type = value;
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'param', process.env.JAEGER_SAMPLER_PARAM);
      if (!isNaN(value)) {
        samplerConfig.param = parseFloat(value);
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'hostPort', process.env.JAEGER_SAMPLER_MANAGER_HOST_PORT);
      if (value) {
        samplerConfig.hostPort = value;
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'host', process.env.JAEGER_SAMPLER_HOST);
      if (value) {
        samplerConfig.host = value;
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'port', process.env.JAEGER_SAMPLER_PORT);
      if (value) {
        samplerConfig.port = parseInt(value);
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'samplingPath', process.env.JAEGER_SAMPLER_SAMPLING_PATH);
      if (value) {
        samplerConfig.samplingPath = value;
      }

      value = ConfigurationEnv._getConfigValue(config.sampler, 'refreshIntervalMs', process.env.JAEGER_SAMPLER_REFRESH_INTERVAL);
      if (value) {
        samplerConfig.refreshIntervalMs = parseInt(value);
      }

      return samplerConfig;
    }
  }, {
    key: '_getReporterFromEnv',
    value: function _getReporterFromEnv(config) {
      var reporterConfig = {};
      var value = ConfigurationEnv._getConfigValue(config.reporter, 'logSpans', process.env.JAEGER_REPORTER_LOG_SPANS);
      if (value) {
        reporterConfig.logSpans = Boolean(value);
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'flushIntervalMs', process.env.JAEGER_REPORTER_FLUSH_INTERVAL);
      if (value) {
        reporterConfig.flushIntervalMs = parseInt(value);
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'collectorEndpoint', process.env.JAEGER_ENDPOINT || process.env.JAEGER_REPORTER_ENDPOINT);
      if (value) {
        reporterConfig.collectorEndpoint = value;
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'username', process.env.JAEGER_USER || process.env.JAEGER_REPORTER_USER);
      if (value) {
        reporterConfig.username = value;
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'password', process.env.JAEGER_PASSWORD || process.env.JAEGER_REPORTER_PASSWORD);
      if (value) {
        reporterConfig.password = value;
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'agentHost', process.env.JAEGER_AGENT_HOST || process.env.JAEGER_REPORTER_AGENT_HOST);
      if (value) {
        reporterConfig.agentHost = value;
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'timeoutMs', process.env.JAEGER_REPORTER_TIMEOUT);
      if (value) {
        reporterConfig.timeoutMs = parseInt(value);
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'agentPort', process.env.JAEGER_AGENT_PORT || process.env.JAEGER_REPORTER_AGENT_PORT);
      if (value) {
        reporterConfig.agentPort = parseInt(value);
      }

      value = ConfigurationEnv._getConfigValue(config.reporter, 'agentSocketType', process.env.JAEGER_AGENT_SOCKET_TYPE);
      if (value) {
        reporterConfig.agentSocketType = value;
      }

      return reporterConfig;
    }
  }, {
    key: '_parseTagsFromEnv',
    value: function _parseTagsFromEnv(options) {
      if (options.tags) {
        return options.tags;
      }
      var tags = {};
      if (process.env.JAEGER_TAGS) {
        var tagsList = process.env.JAEGER_TAGS.split(',');
        var len = tagsList.length;
        var idx = 0;
        while (idx < len) {
          var kv = tagsList[idx].split('=');
          var k = kv[0].trim();
          var v = kv[1].trim();
          if (_util2.default.startsWith(v, '${') && _util2.default.endsWith(v, '}')) {
            var ed = v.substring(2, v.length - 1).split(':');
            v = process.env[ed[0]];
            if (!v && ed[1] !== '') {
              v = ed[1];
            }
          }
          tags[k] = v;
          idx += 1;
        }
      }
      return tags;
    }

    /**
     * Initialize and return a new instance of Jaeger Tracer from environment variables.
     * config or options can be passed to override environment variables.
     *
     * @param {Object} config - configuration, see Configuration.initTracer
     * @param {Object} options - options, see Configuration.initTracer
     */

  }, {
    key: 'initTracer',
    value: function initTracer() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      ConfigurationEnv._validateEnv();

      config.disable = config.disable || process.env.JAEGER_DISABLED === 'true' || process.env.JAEGER_DISABLE === 'true';
      config.serviceName = config.serviceName || process.env.JAEGER_SERVICE_NAME;

      options.tags = ConfigurationEnv._parseTagsFromEnv(options);
      var samplerConfig = ConfigurationEnv._getSamplerFromEnv(config);
      if (Object.keys(samplerConfig).length > 0) {
        config.sampler = samplerConfig;
      }

      if (!options.reporter) {
        var reporterConfig = ConfigurationEnv._getReporterFromEnv(config, options);
        if (Object.keys(reporterConfig).length > 0) {
          config.reporter = reporterConfig;
        }
      }
      return _configuration2.default.initTracer(config, options);
    }
  }]);

  return ConfigurationEnv;
}();

exports.default = ConfigurationEnv;
//# sourceMappingURL=configuration_env.js.map