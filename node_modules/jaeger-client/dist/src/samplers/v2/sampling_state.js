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

var _constants = require('../../constants');

var _span_context = require('../../span_context');

var _span_context2 = _interopRequireDefault(_span_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SamplingState = function () {

  /**
   * When state is not final, sampling will be retried on other write operations,
   * and spans will remain writable.
   *
   * This field exists to help distinguish between when a span can have a properly
   * correlated operation name -> sampling rate mapping, and when it cannot.
   * Adaptive sampling uses the operation name of a span to correlate it with
   * a sampling rate.  If an operation name is set on a span after the span's creation
   * then adaptive sampling cannot associate the operation name with the proper sampling rate.
   * In order to correct this we allow a span to be written to, so that we can re-sample
   * it in the case that an operation name is set after span creation. Situations
   * where a span context's sampling decision is finalized include:
   * - it has inherited the sampling decision from its parent
   * - its debug flag is set via the sampling.priority tag
   * - it is finish()-ed
   * - setOperationName is called
   * - it is used as a parent for another span
   * - its context is serialized using injectors
   */

  // samplers may store their individual states in this map
  function SamplingState(localRootSpanIdStr) {
    _classCallCheck(this, SamplingState);

    this._extendedState = {};
    this._flags = 0;
    this._final = false;

    this._localRootSpanIdStr = localRootSpanIdStr;
  }

  // checks if another span context has the same Span ID as the local root span


  // Span ID of the local root span, i.e. the first span in this process for this trace.


  // shared Flags from span context


  _createClass(SamplingState, [{
    key: 'isLocalRootSpan',
    value: function isLocalRootSpan(context) {
      return this._localRootSpanIdStr === context.spanIdStr;
    }
  }, {
    key: 'localRootSpanId',
    value: function localRootSpanId() {
      return this._localRootSpanIdStr;
    }
  }, {
    key: 'extendedState',
    value: function extendedState() {
      return this._extendedState;
    }
  }, {
    key: 'isFinal',
    value: function isFinal() {
      return this._final;
    }
  }, {
    key: 'setFinal',
    value: function setFinal(value) {
      this._final = value;
    }
  }, {
    key: 'isSampled',
    value: function isSampled() {
      return Boolean(this._flags & _constants.SAMPLED_MASK);
    }
  }, {
    key: 'setSampled',
    value: function setSampled(enable) {
      this._toggleFlag(_constants.SAMPLED_MASK, enable);
    }
  }, {
    key: 'isDebug',
    value: function isDebug() {
      return Boolean(this._flags & _constants.DEBUG_MASK);
    }
  }, {
    key: 'setDebug',
    value: function setDebug(enable) {
      this._toggleFlag(_constants.DEBUG_MASK, enable);
    }
  }, {
    key: 'isFirehose',
    value: function isFirehose() {
      return Boolean(this._flags & _constants.FIREHOSE_MASK);
    }
  }, {
    key: 'setFirehose',
    value: function setFirehose(enable) {
      this._toggleFlag(_constants.FIREHOSE_MASK, enable);
    }
  }, {
    key: 'flags',
    value: function flags() {
      return this._flags;
    }
  }, {
    key: 'setFlags',
    value: function setFlags(flags) {
      this._flags = flags;
    }
  }, {
    key: '_toggleFlag',
    value: function _toggleFlag(mask, enable) {
      if (enable) {
        this._flags |= mask;
      } else {
        this._flags &= ~mask;
      }
    }
  }]);

  return SamplingState;
}();

exports.default = SamplingState;
//# sourceMappingURL=sampling_state.js.map