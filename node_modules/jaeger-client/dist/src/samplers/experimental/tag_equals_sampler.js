'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adapt_sampler = require('../_adapt_sampler');

var _base = require('../v2/base');

var _base2 = _interopRequireDefault(_base);

var _span = require('../../span');

var _span2 = _interopRequireDefault(_span);

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

var TagEqualsSampler = function (_BaseSamplerV) {
  _inherits(TagEqualsSampler, _BaseSamplerV);

  function TagEqualsSampler(tagKey, matchers) {
    _classCallCheck(this, TagEqualsSampler);

    var _this = _possibleConstructorReturn(this, (TagEqualsSampler.__proto__ || Object.getPrototypeOf(TagEqualsSampler)).call(this, 'TagEqualsSampler'));

    _this._tagKey = tagKey;
    _this._matchers = {};
    matchers.forEach(function (m) {
      _this._matchers[m.tagValue] = m;
    });
    _this._undecided = { sample: false, retryable: true, tags: null };
    return _this;
  }

  /**
   * Creates the sampler from a JSON configuration of the following form:
   * <code>
   *   {
   *     key: 'taKey',
   *     values: {
   *       'tagValue1': {
   *         firehose: true,
   *       },
   *       'tagValue1: {
   *         firehose: false,
   *       },
   *     },
   *   }
   * </code>
   * @param {JSON} strategy
   */


  _createClass(TagEqualsSampler, [{
    key: '_createOutTags',
    value: function _createOutTags(tagValue) {
      return {
        'sampler.type': 'TagEqualsSampler',
        'sampler.param': tagValue
      };
    }
  }, {
    key: '_decide',
    value: function _decide(span, tagValue) {
      var match = this._matchers[tagValue];
      if (match) {
        if (match.firehose) {
          span._spanContext._setFirehose(true);
        }
        return { sample: true, retryable: false, tags: this._createOutTags(match.tagValue) };
      }
      return this._undecided;
    }
  }, {
    key: 'onCreateSpan',
    value: function onCreateSpan(span) {
      // onCreateSpan is called on a brand new span that has no tags yet, so nothing to do here.
      return this._undecided;
    }
  }, {
    key: 'onSetOperationName',
    value: function onSetOperationName(span, operationName) {
      // this sampler is not sensitive to operationName, so nothing to do here.
      return this._undecided;
    }
  }, {
    key: 'onSetTag',
    value: function onSetTag(span, key, value) {
      if (key === this._tagKey) {
        return this._decide(span, value);
      }
      return this._undecided;
    }
  }], [{
    key: 'fromStrategy',
    value: function fromStrategy(strategy) {
      var key = strategy.key;
      var matchers = [];
      Object.keys(strategy.values).forEach(function (v) {
        matchers.push({
          tagValue: v,
          firehose: Boolean(strategy.values[v].firehose)
        });
      });
      return new TagEqualsSampler(key, matchers);
    }
  }]);

  return TagEqualsSampler;
}(_base2.default);

exports.default = TagEqualsSampler;
//# sourceMappingURL=tag_equals_sampler.js.map