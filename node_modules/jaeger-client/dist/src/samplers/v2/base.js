'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
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

var _constants = require('../constants.js');

var _span = require('../../span');

var _span2 = _interopRequireDefault(_span);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _instanceId = 0;

var BaseSamplerV2 = function () {
  function BaseSamplerV2(name) {
    _classCallCheck(this, BaseSamplerV2);

    this.apiVersion = _constants.SAMPLER_API_V2;

    this._name = name;
    this._uniqueName = BaseSamplerV2._getInstanceId(name);
    this._cachedDecision = { sample: false, retryable: false, tags: null };
  }

  _createClass(BaseSamplerV2, [{
    key: 'name',
    value: function name() {
      return this._name;
    }
  }, {
    key: 'uniqueName',
    value: function uniqueName() {
      return this._uniqueName;
    }
  }, {
    key: 'onCreateSpan',
    value: function onCreateSpan(span) {
      throw new Error(this.name() + ' does not implement onCreateSpan');
    }
  }, {
    key: 'onSetOperationName',
    value: function onSetOperationName(span, operationName) {
      return this._cachedDecision;
    }
  }, {
    key: 'onSetTag',
    value: function onSetTag(span, key, value) {
      return this._cachedDecision;
    }
  }, {
    key: 'close',
    value: function close(callback) {
      if (callback) {
        callback();
      }
    }
  }], [{
    key: '_getInstanceId',
    value: function _getInstanceId(name) {
      return name + '[' + _instanceId++ + ']';
    }
  }]);

  return BaseSamplerV2;
}();

exports.default = BaseSamplerV2;
//# sourceMappingURL=base.js.map