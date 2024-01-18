"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRule = exports.callSource = exports.InvalidSourceResultException = exports.InvalidRuleResultException = void 0;
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const interface_1 = require("../tree/interface");
function _getTypeOfResult(value) {
    if (value === undefined) {
        return 'undefined';
    }
    else if (value === null) {
        return 'null';
    }
    else if (typeof value == 'function') {
        return `Function()`;
    }
    else if (typeof value != 'object') {
        return `${typeof value}(${JSON.stringify(value)})`;
    }
    else {
        if (Object.getPrototypeOf(value) == Object) {
            return `Object(${JSON.stringify(value)})`;
        }
        else if (value.constructor) {
            return `Instance of class ${value.constructor.name}`;
        }
        else {
            return 'Unknown Object';
        }
    }
}
/**
 * When a rule or source returns an invalid value.
 */
class InvalidRuleResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid rule result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidRuleResultException = InvalidRuleResultException;
class InvalidSourceResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid source result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidSourceResultException = InvalidSourceResultException;
function callSource(source, context) {
    return (0, rxjs_1.defer)(async () => {
        let result = source(context);
        if ((0, rxjs_1.isObservable)(result)) {
            result = await (0, rxjs_1.lastValueFrom)(result.pipe((0, rxjs_1.defaultIfEmpty)(undefined)));
        }
        if (result && interface_1.TreeSymbol in result) {
            return result;
        }
        throw new InvalidSourceResultException(result);
    });
}
exports.callSource = callSource;
function callRule(rule, input, context) {
    if ((0, rxjs_1.isObservable)(input)) {
        return input.pipe((0, rxjs_1.mergeMap)((inputTree) => callRuleAsync(rule, inputTree, context)));
    }
    else {
        return (0, rxjs_1.defer)(() => callRuleAsync(rule, input, context));
    }
}
exports.callRule = callRule;
async function callRuleAsync(rule, tree, context) {
    let result = await rule(tree, context);
    while (typeof result === 'function') {
        // This is considered a Rule, chain the rule and return its output.
        result = await result(tree, context);
    }
    if (typeof result === 'undefined') {
        return tree;
    }
    if ((0, rxjs_1.isObservable)(result)) {
        result = await (0, rxjs_1.lastValueFrom)(result.pipe((0, rxjs_1.defaultIfEmpty)(tree)));
    }
    if (result && interface_1.TreeSymbol in result) {
        return result;
    }
    throw new InvalidRuleResultException(result);
}
