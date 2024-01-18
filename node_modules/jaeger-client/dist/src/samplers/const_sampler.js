'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _adapt_sampler = require('./_adapt_sampler');

var _adapt_sampler2 = _interopRequireDefault(_adapt_sampler);

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

var ConstSampler = function (_LegacySamplerV1Base) {
  _inherits(ConstSampler, _LegacySamplerV1Base);

  function ConstSampler(decision) {
    _classCallCheck(this, ConstSampler);

    var _this = _possibleConstructorReturn(this, (ConstSampler.__proto__ || Object.getPrototypeOf(ConstSampler)).call(this, 'ConstSampler'));

    _this._decision = decision;
    return _this;
  }

  _createClass(ConstSampler, [{
    key: 'name',
    value: function name() {
      return 'ConstSampler';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name() + '(' + (this._decision ? 'always' : 'never') + ')';
    }
  }, {
    key: 'isSampled',
    value: function isSampled(operation, tags) {
      if (this._decision) {
        tags[constants.SAMPLER_TYPE_TAG_KEY] = constants.SAMPLER_TYPE_CONST;
        tags[constants.SAMPLER_PARAM_TAG_KEY] = this._decision;
      }
      return this._decision;
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      if (!(other instanceof ConstSampler)) {
        return false;
      }

      return this.decision === other.decision;
    }
  }, {
    key: 'decision',
    get: function get() {
      return this._decision;
    }
  }]);

  return ConstSampler;
}(_adapt_sampler2.default);

exports.default = ConstSampler;
//# sourceMappingURL=const_sampler.js.map