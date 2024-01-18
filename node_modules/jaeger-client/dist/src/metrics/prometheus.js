'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2018 Jaeger Author.
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

var CounterPromWrapper = function () {
  function CounterPromWrapper(counter) {
    _classCallCheck(this, CounterPromWrapper);

    this._counter = counter;
  }

  _createClass(CounterPromWrapper, [{
    key: 'increment',
    value: function increment(delta) {
      this._counter.inc(delta);
    }
  }]);

  return CounterPromWrapper;
}();

var GaugePromWrapper = function () {
  function GaugePromWrapper(gauge) {
    _classCallCheck(this, GaugePromWrapper);

    this._gauge = gauge;
  }

  _createClass(GaugePromWrapper, [{
    key: 'update',
    value: function update(value) {
      this._gauge.set(value);
    }
  }]);

  return GaugePromWrapper;
}();

var PrometheusMetricsFactory = function () {

  /**
   * Construct metrics factory for Prometheus
   *
   * To instantiate, prom-client needs to be passed like this:
   *
   *    var PrometheusMetricsFactory = require('jaeger-client').PrometheusMetricsFactory;
   *    var promClient = require('prom-client');
   *
   *    var namespace = 'your-namespace';
   *    var metrics = new PrometheusMetricsFactory(promClient, namespace);
   *
   * @param {Object} promClient - prom-client object.
   * @param {String} namespace - Optional a namespace that prepends to each metric name.
   */
  function PrometheusMetricsFactory(promClient, namespace) {
    _classCallCheck(this, PrometheusMetricsFactory);

    this._cache = {};

    if (!promClient || !promClient.Counter || !promClient.Gauge) {
      throw new Error('prom-client must be provided');
    }
    this._promClient = promClient;
    this._namespace = namespace;
  }

  _createClass(PrometheusMetricsFactory, [{
    key: '_createMetric',
    value: function _createMetric(metric, name, labels) {
      var _cache$key;

      var labelNames = [];
      var labelValues = [];
      for (var _key in labels) {
        labelNames.push(_key);
        labelValues.push(labels[_key]);
      }
      var key = name + ',' + labelNames.toString();
      var help = name;
      if (this._namespace) {
        name = this._namespace + '_' + name;
      }
      if (!(key in this._cache)) {
        this._cache[key] = new metric({ name: name, help: help, labelNames: labelNames });
      }
      return labelValues.length > 0 ? (_cache$key = this._cache[key]).labels.apply(_cache$key, labelValues) : this._cache[key];
    }

    /**
     * Create a counter metric
     * @param {string} name - metric name
     * @param {any} tags - labels
     * @returns {Counter} - created counter metric
     */

  }, {
    key: 'createCounter',
    value: function createCounter(name, tags) {
      return new CounterPromWrapper(this._createMetric(this._promClient.Counter, name, tags));
    }

    /**
     * Create a gauge metric
     * @param {string} name - metric name
     * @param {any} tags - labels
     * @returns {Gauge} - created gauge metric
     */

  }, {
    key: 'createGauge',
    value: function createGauge(name, tags) {
      return new GaugePromWrapper(this._createMetric(this._promClient.Gauge, name, tags));
    }
  }]);

  return PrometheusMetricsFactory;
}();

exports.default = PrometheusMetricsFactory;
//# sourceMappingURL=prometheus.js.map