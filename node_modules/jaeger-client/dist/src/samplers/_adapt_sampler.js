'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.adaptSampler = adaptSampler;
exports.adaptSamplerOrThrow = adaptSamplerOrThrow;

var _constants = require('./constants');

var _span = require('../span');

var _span2 = _interopRequireDefault(_span);

var _base = require('./v2/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Copyright (c) 2019 Uber Technologies, Inc.
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

function adaptSampler(sampler) {
  if (!sampler) {
    return null;
  }
  if (sampler.apiVersion === _constants.SAMPLER_API_V2) {
    // already v2 API compatible
    return sampler;
  }
  if (!sampler.apiVersion) {
    // v1 legacy sampler
    return new LegacySamplerV1Adapter(sampler);
  }
  return null;
}

function adaptSamplerOrThrow(sampler) {
  var s = adaptSampler(sampler);
  if (!s) {
    throw new Error('Unrecognized sampler: ' + sampler);
  }
  return s;
}

/**
 * Convenience base class for simple samplers that implement isSampled() function
 * that is not sensitive to its arguments.
 */

var LegacySamplerV1Base = function (_BaseSamplerV) {
  _inherits(LegacySamplerV1Base, _BaseSamplerV);

  function LegacySamplerV1Base(name) {
    _classCallCheck(this, LegacySamplerV1Base);

    return _possibleConstructorReturn(this, (LegacySamplerV1Base.__proto__ || Object.getPrototypeOf(LegacySamplerV1Base)).call(this, name));
  }

  _createClass(LegacySamplerV1Base, [{
    key: 'isSampled',
    value: function isSampled(operationName, outTags) {
      throw new Error('Subclass must override isSampled()');
    }
  }, {
    key: 'onCreateSpan',
    value: function onCreateSpan(span) {
      var outTags = {};
      var isSampled = this.isSampled(span.operationName, outTags);
      return { sample: isSampled, retryable: false, tags: outTags };
    }
  }, {
    key: 'onSetOperationName',
    value: function onSetOperationName(span, operationName) {
      var outTags = {};
      var isSampled = this.isSampled(span.operationName, outTags);
      return { sample: isSampled, retryable: false, tags: outTags };
    }
  }, {
    key: 'onSetTag',
    value: function onSetTag(span, key, value) {
      return { sample: false, retryable: true, tags: null };
    }
  }]);

  return LegacySamplerV1Base;
}(_base2.default);

/**
 * Transforms legacy v1 sampler into V2.
 * Primarily intended for simple samplers that are not sensitive to
 * things like operation names or tags and make a decision only once.
 *
 * However, to keep compatible with existing behavior, onCreateSpan and onSetTag
 * return retryable decision, because previously that's how tracer was behaving,
 * where as onSetOperation() returns retryable=false, since that is what the tracer
 * used to do.
 */


exports.default = LegacySamplerV1Base;

var LegacySamplerV1Adapter = function (_LegacySamplerV1Base) {
  _inherits(LegacySamplerV1Adapter, _LegacySamplerV1Base);

  function LegacySamplerV1Adapter(delegate) {
    _classCallCheck(this, LegacySamplerV1Adapter);

    var _this2 = _possibleConstructorReturn(this, (LegacySamplerV1Adapter.__proto__ || Object.getPrototypeOf(LegacySamplerV1Adapter)).call(this, delegate.name()));

    _this2.apiVersion = _constants.SAMPLER_API_V2;

    _this2._delegate = delegate;
    return _this2;
  }

  _createClass(LegacySamplerV1Adapter, [{
    key: 'isSampled',
    value: function isSampled(operationName, outTags) {
      return this._delegate.isSampled(operationName, outTags);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this._delegate.toString();
    }
  }, {
    key: 'close',
    value: function close(callback) {
      this._delegate.close(callback);
    }
  }]);

  return LegacySamplerV1Adapter;
}(LegacySamplerV1Base);
//# sourceMappingURL=_adapt_sampler.js.map