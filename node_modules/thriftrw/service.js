// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

var ast = require('./ast');
var Message = require('./message').Message;
var MessageRW = require('./message').MessageRW;

function ThriftFunction(args) {
    this.name = args.name;
    this.service = args.service;
    this.fullName = this.service.name + '::' + this.name;
    this.model = args.model;
    this.args = null;
    this.result = null;
    this.strict = args.strict;
    this.linked = false;
}

ThriftFunction.prototype.compile = function process(def, model) {
    this.def = def;
    this.name = def.id.name;

    var argsId = new ast.Identifier(this.name + '_args');
    argsId.as = this.fullName + '_args';
    var argsStruct = new ast.Struct(argsId, def.fields);
    argsStruct.isArgument = true;
    this.args = model.compileStruct(argsStruct);

    var returnType = def.returns;
    var resultFields = def.throws || [];
    if (returnType.type !== 'BaseType' || returnType.baseType !== 'void') {
        var successFieldId = new ast.FieldIdentifier(0);
        var successField = new ast.Field(successFieldId, def.returns, 'success');
        successField.required = false;
        successField.optional = true;
        successField.isResult = true;
        resultFields.unshift(successField);
    }

    var resultId = new ast.Identifier(this.name + '_result');
    resultId.as = this.fullName + '_result';
    var resultStruct = new ast.Struct(resultId, resultFields);
    resultStruct.isResult = true;
    this.result = model.compileStruct(resultStruct);

    this.oneway = def.oneway;
    this.annotations = def.annotations;
};

ThriftFunction.prototype.link = function link(model) {
    this.args.link(model);
    this.result.link(model);

    this.Arguments = this.args.Constructor;
    this.Result = this.result.Constructor;

    // TODO cover oneway, if we ever have use for it
    // istanbul ignore next
    var type = this.oneway ? 'ONEWAY' : 'CALL';
    this.ArgumentsMessage = this.makeMessageConstructor(this.name, type);
    this.ResultMessage = this.makeMessageConstructor(this.name, 'REPLY');

    this.argumentsMessageRW = new MessageRW(this.args.rw, model.exception.rw);
    this.resultMessageRW = new MessageRW(this.result.rw, model.exception.rw);
};

ThriftFunction.prototype.makeMessageConstructor = function makeMessageConstructor(name, type) {
    function FunctionMessage(message) {
        Message.call(this, message);
        this.name = message.name || name;
        this.type = message.type || type;
    }
    return FunctionMessage;
};

function ThriftService(args) {
    this.name = null;
    this.functions = [];
    this.functionsByName = Object.create(null);
    this.surface = this.functionsByName;
    this.strict = args.strict;
    this.baseService = null;
    this.linked = false;
    this.annotations = null;
}

ThriftService.prototype.models = 'service';

ThriftService.prototype.compile = function process(def, model) {
    this.name = def.id.name;
    for (var index = 0; index < def.functions.length; index++) {
        this.compileFunction(def.functions[index], model);
    }
    this.baseService = def.baseService;
    this.annotations = def.annotations;
};

ThriftService.prototype.compileFunction = function processFunction(def, model) {
    var thriftFunction = new ThriftFunction({
        name: def.id.name,
        service: this,
        strict: this.strict
    });
    thriftFunction.compile(def, model);
    this.addFunction(thriftFunction);
};

ThriftService.prototype.addFunction = function addFunction(thriftFunction, thrift) {
    this.functions.push(thriftFunction);
    if (!this.functionsByName[thriftFunction.name]) {
        this.functionsByName[thriftFunction.name] = thriftFunction;
        if (thrift) {
            thrift.define(
                this.name + '::' + thriftFunction.args.name,
                thriftFunction.def,
                thriftFunction.args
            );

            thrift.define(
                this.name + '::' + thriftFunction.result.name,
                thriftFunction.def,
                thriftFunction.result
            );
        }
    } else {
        throw new Error(this.name + '.' + thriftFunction.name + ' already inherited from baseService');
    }
};

ThriftService.prototype.link = function link(model) {
    var index = 0;

    if (this.linked) {
        return this;
    }
    this.linked = true;

    if (this.baseService) {
        var baseService = model.resolveIdentifier(this.baseService, this.baseService.name, 'service');
        baseService.link(model);
        for (index = 0; index < baseService.functions.length; index++) {
            var thriftFunction = baseService.functions[index];
            this.addFunction(thriftFunction, model);
        }
    }

    for (index = 0; index < this.functions.length; index++) {
        this.functions[index].link(model);
    }

    model.services[this.name] = this.surface;

    // istanbul ignore else
    if (!/^[a-z]/.test(this.name)) {
        model[this.name] = this.surface;
    }

    return this;
};

module.exports.ThriftFunction = ThriftFunction;
module.exports.ThriftService = ThriftService;
