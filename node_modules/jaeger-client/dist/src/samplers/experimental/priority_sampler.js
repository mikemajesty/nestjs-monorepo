'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrioritySamplerState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adapt_sampler = require('../_adapt_sampler');

var _base = require('../v2/base');

var _base2 = _interopRequireDefault(_base);

var _span = require('../../span');

var _span2 = _interopRequireDefault(_span);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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

/**
 * PrioritySamplerState keeps the state of all underlying samplers, specifically
 * whether each of them has previously returned retryable=false, in which case
 * those samplers are no longer invoked on future sampling calls.
 */
var PrioritySamplerState = exports.PrioritySamplerState = function PrioritySamplerState(numDelegateSamplers) {
  _classCallCheck(this, PrioritySamplerState);

  this.samplerFired = Array(numDelegateSamplers);
  // TODO: for some reason Babel does not translate array.fill() to polyfil that works w/ Node 0.10
  for (var i = 0; i < numDelegateSamplers; i++) {
    this.samplerFired[i] = false;
  }
};

/**
 * PrioritySampler contains a list of samplers that it interrogates in order.
 * Sampling methods return as soon as one of the samplers returns sample=true.
 * The retryable state for each underlying sampler is stored in the extended context
 * and once retryable=false is returned by one of the delegates it will never be
 * called against.
 */


var PrioritySampler = function (_BaseSamplerV) {
  _inherits(PrioritySampler, _BaseSamplerV);

  function PrioritySampler(samplers) {
    _classCallCheck(this, PrioritySampler);

    var _this = _possibleConstructorReturn(this, (PrioritySampler.__proto__ || Object.getPrototypeOf(PrioritySampler)).call(this, 'PrioritySampler'));

    _this._delegates = samplers.map(function (s) {
      return (0, _adapt_sampler.adaptSamplerOrThrow)(s);
    });
    return _this;
  }

  _createClass(PrioritySampler, [{
    key: '_getOrCreateState',
    value: function _getOrCreateState(span) {
      var store = span.context()._samplingState.extendedState();
      var stateKey = this.uniqueName();
      var state = store[stateKey];
      if (!state) {
        state = new PrioritySamplerState(this._delegates.length);
        store[stateKey] = state;
      }
      return state;
    }
  }, {
    key: '_trySampling',
    value: function _trySampling(span, fn) {
      var state = this._getOrCreateState(span);
      var retryable = false;
      for (var i = 0; i < this._delegates.length; i++) {
        if (state.samplerFired[i]) {
          continue;
        }
        var d = fn(this._delegates[i]);
        retryable = retryable || d.retryable;
        if (!d.retryable) {
          state.samplerFired[i] = true;
        }
        if (d.sample) {
          return d; // TODO do we want to alter out tags?
        }
      }
      return { sample: false, retryable: retryable, tags: null };
    }
  }, {
    key: 'onCreateSpan',
    value: function onCreateSpan(span) {
      return this._trySampling(span, function (delegate) {
        return delegate.onCreateSpan(span);
      });
    }
  }, {
    key: 'onSetOperationName',
    value: function onSetOperationName(span, operationName) {
      return this._trySampling(span, function (delegate) {
        return delegate.onSetOperationName(span, operationName);
      });
    }
  }, {
    key: 'onSetTag',
    value: function onSetTag(span, key, value) {
      return this._trySampling(span, function (delegate) {
        return delegate.onSetTag(span, key, value);
      });
    }
  }, {
    key: 'close',
    value: function close(callback) {
      var countdownCallback = _util2.default.countdownCallback(this._delegates.length, callback);
      this._delegates.forEach(function (r) {
        return r.close(countdownCallback);
      });
    }
  }]);

  return PrioritySampler;
}(_base2.default);

exports.default = PrioritySampler;
//# sourceMappingURL=priority_sampler.js.map