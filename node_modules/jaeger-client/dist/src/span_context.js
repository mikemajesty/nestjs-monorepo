'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
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

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _sampling_state = require('./samplers/v2/sampling_state');

var _sampling_state2 = _interopRequireDefault(_sampling_state);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _span = require('./span');

var _span2 = _interopRequireDefault(_span);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpanContext = function () {
  // indicates that span context represents a remote parent

  function SpanContext(traceId, spanId, parentId, traceIdStr, spanIdStr, parentIdStr) {
    var baggage = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
    var debugId = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var samplingState = arguments[8];

    _classCallCheck(this, SpanContext);

    this._traceId = traceId;
    this._spanId = spanId;
    this._parentId = parentId || null;
    this._traceIdStr = traceIdStr;
    this._spanIdStr = spanIdStr;
    this._parentIdStr = parentIdStr;
    this._baggage = baggage;
    this._debugId = debugId;
    this._samplingState = samplingState || new _sampling_state2.default(this.spanIdStr);
    this._remote = false;
  }

  _createClass(SpanContext, [{
    key: '_setSampled',
    value: function _setSampled(value) {
      this._samplingState.setSampled(value);
    }
  }, {
    key: '_setDebug',
    value: function _setDebug(value) {
      this._samplingState.setDebug(value);
    }
  }, {
    key: '_setFirehose',
    value: function _setFirehose(value) {
      this._samplingState.setFirehose(value);
    }
  }, {
    key: '_setRemote',
    value: function _setRemote(value) {
      this._remote = value;
    }
  }, {
    key: 'finalizeSampling',
    value: function finalizeSampling() {
      return this._samplingState.setFinal(true);
    }
  }, {
    key: 'isRemote',
    value: function isRemote() {
      return this._remote;
    }
  }, {
    key: 'isDebugIDContainerOnly',
    value: function isDebugIDContainerOnly() {
      return !this.isValid && Boolean(this._debugId);
    }

    /**
     * @return {boolean} - returns whether or not this span context was sampled.
     **/

  }, {
    key: 'isSampled',
    value: function isSampled() {
      return this._samplingState.isSampled();
    }

    /**
     * @return {boolean} - returns whether or not this span context has a debug flag set.
     **/

  }, {
    key: 'isDebug',
    value: function isDebug() {
      return this._samplingState.isDebug();
    }
  }, {
    key: 'isFirehose',
    value: function isFirehose() {
      return this._samplingState.isFirehose();
    }
  }, {
    key: 'withBaggageItem',
    value: function withBaggageItem(key, value) {
      var newBaggage = _util2.default.clone(this._baggage);
      newBaggage[key] = value;
      return new SpanContext(this._traceId, this._spanId, this._parentId, this._traceIdStr, this._spanIdStr, this._parentIdStr, newBaggage, this._debugId, this._samplingState);
    }
  }, {
    key: '_makeChildContext',
    value: function _makeChildContext(childId) {
      var idIsStr = typeof childId === 'string';
      var _childId = idIsStr ? null : childId;
      var _childIdStr = idIsStr ? childId : null;
      return new SpanContext(this._traceId, // traceId
      _childId, // spanId
      this._spanId, // parentId
      this._traceIdStr, // traceIdStr
      _childIdStr, // spanIdStr
      this._spanIdStr, // parentIdStr
      this._baggage, // baggage
      this._debugId, // debugID
      this._samplingState // samplingState
      );
    }

    /**
     * @return {string} - returns trace ID as string or "" if null
     */

  }, {
    key: 'toTraceId',
    value: function toTraceId() {
      return this.traceIdStr || "";
    }

    /**
     * @return {string} - returns span ID as string or "" if null
     */

  }, {
    key: 'toSpanId',
    value: function toSpanId() {
      return this.spanIdStr || "";
    }

    /**
     * @return {string} - returns a string version of this span context.
     **/

  }, {
    key: 'toString',
    value: function toString() {
      return String(this.traceIdStr) + ':' + String(this.spanIdStr) + ':' + String(this.parentIdStr || 0) + ':' + this._samplingState.flags().toString(16);
    }

    /**
     * @param {string} serializedString - a serialized span context.
     * @return {SpanContext} - returns a span context represented by the serializedString.
     **/

  }, {
    key: 'traceId',
    get: function get() {
      if (this._traceId == null && this._traceIdStr != null) {
        // make sure that the string is 32 or 16 characters long to generate the
        // corresponding 64 or 128 bits buffer by padding the start with zeros if necessary
        // https://github.com/jaegertracing/jaeger/issues/1657
        // At the same time this will enforce that the HEX has an even number of digits, node is expecting 2 HEX characters per byte
        // https://github.com/nodejs/node/issues/21242
        var traceIdExactLength = this._traceIdStr.length > 16 ? 32 : 16;
        if (this._traceIdStr.length === traceIdExactLength) {
          this._traceId = _util2.default.newBufferFromHex(this._traceIdStr);
        } else {
          var padding = traceIdExactLength === 16 ? '0000000000000000' : '00000000000000000000000000000000';
          var safeTraceIdStr = (padding + this._traceIdStr).slice(-traceIdExactLength);
          this._traceId = _util2.default.newBufferFromHex(safeTraceIdStr);
        }
      }
      return this._traceId;
    },
    set: function set(traceId) {
      this._traceId = traceId;
      this._traceIdStr = null;
    }
  }, {
    key: 'spanId',
    get: function get() {
      if (this._spanId == null && this._spanIdStr != null) {
        this._spanId = _util2.default.encodeInt64(this._spanIdStr);
      }
      return this._spanId;
    },
    set: function set(spanId) {
      this._spanId = spanId;
      this._spanIdStr = null;
    }
  }, {
    key: 'parentId',
    get: function get() {
      if (this._parentId == null && this._parentIdStr != null) {
        this._parentId = _util2.default.encodeInt64(this._parentIdStr);
      }
      return this._parentId;
    },
    set: function set(parentId) {
      this._parentId = parentId;
      this._parentIdStr = null;
    }
  }, {
    key: 'traceIdStr',
    get: function get() {
      if (this._traceIdStr == null && this._traceId != null) {
        this._traceIdStr = _util2.default.removeLeadingZeros(this._traceId.toString('hex'));
      }
      return this._traceIdStr;
    }
  }, {
    key: 'spanIdStr',
    get: function get() {
      if (this._spanIdStr == null && this._spanId != null) {
        this._spanIdStr = _util2.default.removeLeadingZeros(this._spanId.toString('hex'));
      }
      return this._spanIdStr;
    }
  }, {
    key: 'parentIdStr',
    get: function get() {
      if (this._parentIdStr == null && this._parentId != null) {
        this._parentIdStr = _util2.default.removeLeadingZeros(this._parentId.toString('hex'));
      }
      return this._parentIdStr;
    }
  }, {
    key: 'flags',
    get: function get() {
      return this._samplingState.flags();
    },
    set: function set(flags) {
      this._samplingState.setFlags(flags);
    }
  }, {
    key: 'baggage',
    get: function get() {
      return this._baggage;
    },
    set: function set(baggage) {
      this._baggage = baggage;
    }
  }, {
    key: 'debugId',
    get: function get() {
      return this._debugId;
    },
    set: function set(debugId) {
      this._debugId = debugId;
    }
  }, {
    key: 'samplingFinalized',
    get: function get() {
      return this._samplingState.isFinal();
    }
  }, {
    key: 'isValid',
    get: function get() {
      return Boolean((this._traceId || this._traceIdStr) && (this._spanId || this._spanIdStr));
    }
  }], [{
    key: 'fromString',
    value: function fromString(serializedString) {
      var headers = serializedString.split(':');
      if (headers.length !== 4) {
        return null;
      }

      // Note: Number type in JS cannot represent the full range of 64bit unsigned ints,
      // so using parseInt() on strings representing 64bit hex numbers only returns
      // an approximation of the actual value. Fortunately, we do not depend on the
      // returned value, we are only using it to validate that the string is
      // a valid hex number (which is faster than doing it manually).  We cannot use
      // Int64(numberValue).toBuffer() because it throws exceptions on bad strings.
      var approxTraceId = parseInt(headers[0], 16);
      var NaNDetected = isNaN(approxTraceId) || approxTraceId === 0 || isNaN(parseInt(headers[1], 16)) || isNaN(parseInt(headers[2], 16)) || isNaN(parseInt(headers[3], 16));

      if (NaNDetected) {
        return null;
      }

      var parentId = null;
      if (headers[2] !== '0') {
        parentId = headers[2];
      }

      return SpanContext.withStringIds(headers[0], headers[1], parentId, parseInt(headers[3], 16));
    }
  }, {
    key: 'withBinaryIds',
    value: function withBinaryIds(traceId, spanId, parentId, flags) {
      var baggage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var debugId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      var ctx = new SpanContext(traceId, spanId, parentId, null, // traceIdStr: string,
      null, // spanIdStr: string,
      null, // parentIdStr: string,
      baggage, debugId);
      ctx.flags = flags;
      return ctx;
    }
  }, {
    key: 'withStringIds',
    value: function withStringIds(traceIdStr, spanIdStr, parentIdStr, flags) {
      var baggage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var debugId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      var ctx = new SpanContext(null, // traceId,
      null, // spanId,
      null, // parentId,
      traceIdStr, spanIdStr, parentIdStr, baggage, debugId);
      ctx.flags = flags;
      return ctx;
    }
  }]);

  return SpanContext;
}();

exports.default = SpanContext;
//# sourceMappingURL=span_context.js.map