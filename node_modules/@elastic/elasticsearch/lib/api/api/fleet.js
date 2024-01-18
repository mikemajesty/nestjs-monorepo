"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Fleet {
    constructor(transport) {
        Object.defineProperty(this, "transport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.transport = transport;
    }
    async globalCheckpoints(params, options) {
        const acceptedPath = ['index'];
        const querystring = {};
        const body = undefined;
        for (const key in params) {
            if (acceptedPath.includes(key)) {
                continue;
            }
            else if (key !== 'body') {
                // @ts-expect-error
                querystring[key] = params[key];
            }
        }
        const method = 'GET';
        const path = `/${encodeURIComponent(params.index.toString())}/_fleet/global_checkpoints`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async msearch(params, options) {
        var _a;
        const acceptedPath = ['index'];
        const acceptedBody = ['searches'];
        const querystring = {};
        // @ts-expect-error
        let body = (_a = params.body) !== null && _a !== void 0 ? _a : undefined;
        for (const key in params) {
            if (acceptedBody.includes(key)) {
                // @ts-expect-error
                body = params[key];
            }
            else if (acceptedPath.includes(key)) {
                continue;
            }
            else if (key !== 'body') {
                // @ts-expect-error
                querystring[key] = params[key];
            }
        }
        let method = '';
        let path = '';
        if (params.index != null) {
            method = body != null ? 'POST' : 'GET';
            path = `/${encodeURIComponent(params.index.toString())}/_fleet/_fleet_msearch`;
        }
        else {
            method = body != null ? 'POST' : 'GET';
            path = '/_fleet/_fleet_msearch';
        }
        return await this.transport.request({ path, method, querystring, bulkBody: body }, options);
    }
    async search(params, options) {
        const acceptedPath = ['index'];
        const acceptedBody = ['aggregations', 'aggs', 'collapse', 'explain', 'ext', 'from', 'highlight', 'track_total_hits', 'indices_boost', 'docvalue_fields', 'min_score', 'post_filter', 'profile', 'query', 'rescore', 'script_fields', 'search_after', 'size', 'slice', 'sort', '_source', 'fields', 'suggest', 'terminate_after', 'timeout', 'track_scores', 'version', 'seq_no_primary_term', 'stored_fields', 'pit', 'runtime_mappings', 'stats'];
        const querystring = {};
        // @ts-expect-error
        const userBody = params === null || params === void 0 ? void 0 : params.body;
        let body;
        if (typeof userBody === 'string') {
            body = userBody;
        }
        else {
            body = userBody != null ? { ...userBody } : undefined;
        }
        for (const key in params) {
            if (acceptedBody.includes(key)) {
                body = body !== null && body !== void 0 ? body : {};
                // @ts-expect-error
                body[key] = params[key];
            }
            else if (acceptedPath.includes(key)) {
                continue;
            }
            else if (key !== 'body') {
                // @ts-expect-error
                querystring[key] = params[key];
            }
        }
        const method = body != null ? 'POST' : 'GET';
        const path = `/${encodeURIComponent(params.index.toString())}/_fleet/_fleet_search`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
}
exports.default = Fleet;
//# sourceMappingURL=fleet.js.map