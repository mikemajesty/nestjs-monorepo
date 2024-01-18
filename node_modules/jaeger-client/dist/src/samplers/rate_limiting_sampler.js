'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _adapt_sampler = require('./_adapt_sampler');

var _adapt_sampler2 = _interopRequireDefault(_adapt_sampler);

var _rate_limiter = require('../rate_limiter');

var _rate_limiter2 = _interopRequireDefault(_rate_limiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
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

var RateLimitingSampler = function (_LegacySamplerV1Base) {
  _inherits(RateLimitingSampler, _LegacySamplerV1Base);

  function RateLimitingSampler(maxTracesPerSecond, initBalance) {
    _classCallCheck(this, RateLimitingSampler);

    var _this = _possibleConstructorReturn(this, (RateLimitingSampler.__proto__ || Object.getPrototypeOf(RateLimitingSampler)).call(this, 'RateLimitingSampler'));

    _this._init(maxTracesPerSecond, initBalance);
    return _this;
  }

  _createClass(RateLimitingSampler, [{
    key: 'update',
    value: function update(maxTracesPerSecond) {
      var prevMaxTracesPerSecond = this._maxTracesPerSecond;
      this._init(maxTracesPerSecond);
      return this._maxTracesPerSecond !== prevMaxTracesPerSecond;
    }
  }, {
    key: '_init',
    value: function _init(maxTracesPerSecond, initBalance) {
      if (maxTracesPerSecond < 0) {
        throw new Error('maxTracesPerSecond must be greater than 0.0.  Received ' + maxTracesPerSecond);
      }
      var maxBalance = maxTracesPerSecond < 1.0 ? 1.0 : maxTracesPerSecond;

      this._maxTracesPerSecond = maxTracesPerSecond;
      if (this._rateLimiter) {
        this._rateLimiter.update(maxTracesPerSecond, maxBalance);
      } else {
        this._rateLimiter = new _rate_limiter2.default(maxTracesPerSecond, maxBalance, initBalance);
      }
    }
  }, {
    key: 'name',
    value: function name() {
      return 'RateLimitingSampler';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name() + '(maxTracesPerSecond=' + this._maxTracesPerSecond + ')';
    }
  }, {
    key: 'isSampled',
    value: function isSampled(operation, tags) {
      var decision = this._rateLimiter.checkCredit(1.0);
      if (decision) {
        tags[constants.SAMPLER_TYPE_TAG_KEY] = constants.SAMPLER_TYPE_RATE_LIMITING;
        tags[constants.SAMPLER_PARAM_TAG_KEY] = this._maxTracesPerSecond;
      }
      return decision;
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      if (!(other instanceof RateLimitingSampler)) {
        return false;
      }

      return this.maxTracesPerSecond === other.maxTracesPerSecond;
    }
  }, {
    key: 'maxTracesPerSecond',
    get: function get() {
      return this._maxTracesPerSecond;
    }
  }]);

  return RateLimitingSampler;
}(_adapt_sampler2.default);

exports.default = RateLimitingSampler;
//# sourceMappingURL=rate_limiting_sampler.js.map