"use strict";
/*
 * eslint-plugin-sonarjs
 * Copyright (C) 2018-2021 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// https://sonarsource.github.io/rspec/#/rspec/S2201
const parser_services_1 = require("../utils/parser-services");
const docs_url_1 = require("../utils/docs-url");
const utils_1 = require("../utils");
const METHODS_WITHOUT_SIDE_EFFECTS = {
    array: new Set([
        'concat',
        'includes',
        'join',
        'slice',
        'indexOf',
        'lastIndexOf',
        'entries',
        'filter',
        'findIndex',
        'keys',
        'map',
        'values',
        'find',
        'reduce',
        'reduceRight',
        'toString',
        'toLocaleString',
    ]),
    date: new Set([
        'getDate',
        'getDay',
        'getFullYear',
        'getHours',
        'getMilliseconds',
        'getMinutes',
        'getMonth',
        'getSeconds',
        'getTime',
        'getTimezoneOffset',
        'getUTCDate',
        'getUTCDay',
        'getUTCFullYear',
        'getUTCHours',
        'getUTCMilliseconds',
        'getUTCMinutes',
        'getUTCMonth',
        'getUTCSeconds',
        'getYear',
        'toDateString',
        'toISOString',
        'toJSON',
        'toGMTString',
        'toLocaleDateString',
        'toLocaleTimeString',
        'toTimeString',
        'toUTCString',
        'toString',
        'toLocaleString',
    ]),
    math: new Set([
        'abs',
        'E',
        'LN2',
        'LN10',
        'LOG2E',
        'LOG10E',
        'PI',
        'SQRT1_2',
        'SQRT2',
        'abs',
        'acos',
        'acosh',
        'asin',
        'asinh',
        'atan',
        'atanh',
        'atan2',
        'cbrt',
        'ceil',
        'clz32',
        'cos',
        'cosh',
        'exp',
        'expm1',
        'floor',
        'fround',
        'hypot',
        'imul',
        'log',
        'log1p',
        'log10',
        'log2',
        'max',
        'min',
        'pow',
        'random',
        'round',
        'sign',
        'sin',
        'sinh',
        'sqrt',
        'tan',
        'tanh',
        'trunc',
    ]),
    number: new Set(['toExponential', 'toFixed', 'toPrecision', 'toLocaleString', 'toString']),
    regexp: new Set(['test', 'toString']),
    string: new Set([
        'charAt',
        'charCodeAt',
        'codePointAt',
        'concat',
        'includes',
        'endsWith',
        'indexOf',
        'lastIndexOf',
        'localeCompare',
        'match',
        'normalize',
        'padEnd',
        'padStart',
        'repeat',
        'replace',
        'search',
        'slice',
        'split',
        'startsWith',
        'substr',
        'substring',
        'toLocaleLowerCase',
        'toLocaleUpperCase',
        'toLowerCase',
        'toUpperCase',
        'trim',
        'length',
        'toString',
        'valueOf',
        // HTML wrapper methods
        'anchor',
        'big',
        'blink',
        'bold',
        'fixed',
        'fontcolor',
        'fontsize',
        'italics',
        'link',
        'small',
        'strike',
        'sub',
        'sup',
    ]),
};
const rule = {
    meta: {
        messages: {
            useForEach: `Consider using "forEach" instead of "map" as its return value is not being used here.`,
            returnValueMustBeUsed: 'The return value of "{{methodName}}" must be used.',
        },
        schema: [],
        type: 'problem',
        docs: {
            description: 'Return values from functions without side effects should not be ignored',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    create(context) {
        if (!(0, parser_services_1.isRequiredParserServices)(context.parserServices)) {
            return {};
        }
        const services = context.parserServices;
        return {
            CallExpression: (node) => {
                const call = node;
                const { callee } = call;
                if (callee.type === 'MemberExpression') {
                    const { parent } = node;
                    if (parent && parent.type === 'ExpressionStatement') {
                        const methodName = context.getSourceCode().getText(callee.property);
                        const objectType = services.program
                            .getTypeChecker()
                            .getTypeAtLocation(services.esTreeNodeToTSNodeMap.get(callee.object));
                        if (!hasSideEffect(methodName, objectType, services) &&
                            !isReplaceWithCallback(methodName, call.arguments, services)) {
                            context.report(reportDescriptor(methodName, node));
                        }
                    }
                }
            },
        };
    },
};
function isReplaceWithCallback(methodName, callArguments, services) {
    if (methodName === 'replace' && callArguments.length > 1) {
        const type = (0, utils_1.getTypeFromTreeNode)(callArguments[1], services);
        const typeNode = services.program.getTypeChecker().typeToTypeNode(type, undefined, undefined);
        // dynamically import 'typescript' as classic 'import' will fail if project not using 'typescript' parser
        // we are sure it's available as 'RequiredParserServices' are available here
        // eslint-disable-next-line import/no-extraneous-dependencies
        const ts = require('typescript');
        return typeNode && ts.isFunctionTypeNode(typeNode);
    }
    return false;
}
function reportDescriptor(methodName, node) {
    if (methodName === 'map') {
        return {
            messageId: 'useForEach',
            node,
        };
    }
    else {
        return {
            messageId: 'returnValueMustBeUsed',
            node,
            data: { methodName },
        };
    }
}
function hasSideEffect(methodName, objectType, services) {
    const typeAsString = typeToString(objectType, services);
    if (typeAsString !== null) {
        const methods = METHODS_WITHOUT_SIDE_EFFECTS[typeAsString];
        return !(methods && methods.has(methodName));
    }
    return true;
}
function typeToString(tp, services) {
    const typechecker = services.program.getTypeChecker();
    const baseType = typechecker.getBaseTypeOfLiteralType(tp);
    const typeAsString = typechecker.typeToString(baseType);
    if (typeAsString === 'number' || typeAsString === 'string') {
        return typeAsString;
    }
    const symbol = tp.getSymbol();
    if (symbol) {
        const name = symbol.getName();
        switch (name) {
            case 'Array':
            case 'Date':
            case 'Math':
            case 'RegExp':
                return name.toLowerCase();
        }
    }
    return null;
}
module.exports = rule;
//# sourceMappingURL=no-ignored-return.js.map