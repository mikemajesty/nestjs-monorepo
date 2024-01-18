"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternMatchingHost = void 0;
const picomatch_1 = require("picomatch");
const resolver_1 = require("./resolver");
/**
 */
class PatternMatchingHost extends resolver_1.ResolverHost {
    _patterns = new Map();
    addPattern(pattern, replacementFn) {
        const patterns = Array.isArray(pattern) ? pattern : [pattern];
        for (const glob of patterns) {
            const { output } = (0, picomatch_1.parse)(glob);
            this._patterns.set(new RegExp(`^${output}$`), replacementFn);
        }
    }
    _resolve(path) {
        let newPath = path;
        this._patterns.forEach((fn, re) => {
            if (re.test(path)) {
                newPath = fn(newPath);
            }
        });
        return newPath;
    }
}
exports.PatternMatchingHost = PatternMatchingHost;
