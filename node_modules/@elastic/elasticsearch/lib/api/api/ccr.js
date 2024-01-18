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
class Ccr {
    constructor(transport) {
        Object.defineProperty(this, "transport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.transport = transport;
    }
    async deleteAutoFollowPattern(params, options) {
        const acceptedPath = ['name'];
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
        const method = 'DELETE';
        const path = `/_ccr/auto_follow/${encodeURIComponent(params.name.toString())}`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async follow(params, options) {
        const acceptedPath = ['index'];
        const acceptedBody = ['leader_index', 'max_outstanding_read_requests', 'max_outstanding_write_requests', 'max_read_request_operation_count', 'max_read_request_size', 'max_retry_delay', 'max_write_buffer_count', 'max_write_buffer_size', 'max_write_request_operation_count', 'max_write_request_size', 'read_poll_timeout', 'remote_cluster'];
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
        const method = 'PUT';
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/follow`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async followInfo(params, options) {
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
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/info`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async followStats(params, options) {
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
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/stats`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async forgetFollower(params, options) {
        const acceptedPath = ['index'];
        const acceptedBody = ['follower_cluster', 'follower_index', 'follower_index_uuid', 'leader_remote_cluster'];
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
        const method = 'POST';
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/forget_follower`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async getAutoFollowPattern(params, options) {
        const acceptedPath = ['name'];
        const querystring = {};
        const body = undefined;
        params = params !== null && params !== void 0 ? params : {};
        for (const key in params) {
            if (acceptedPath.includes(key)) {
                continue;
            }
            else if (key !== 'body') {
                // @ts-expect-error
                querystring[key] = params[key];
            }
        }
        let method = '';
        let path = '';
        if (params.name != null) {
            method = 'GET';
            path = `/_ccr/auto_follow/${encodeURIComponent(params.name.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_ccr/auto_follow';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async pauseAutoFollowPattern(params, options) {
        const acceptedPath = ['name'];
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
        const method = 'POST';
        const path = `/_ccr/auto_follow/${encodeURIComponent(params.name.toString())}/pause`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async pauseFollow(params, options) {
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
        const method = 'POST';
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/pause_follow`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async putAutoFollowPattern(params, options) {
        const acceptedPath = ['name'];
        const acceptedBody = ['remote_cluster', 'follow_index_pattern', 'leader_index_patterns', 'leader_index_exclusion_patterns', 'max_outstanding_read_requests', 'settings', 'max_outstanding_write_requests', 'read_poll_timeout', 'max_read_request_operation_count', 'max_read_request_size', 'max_retry_delay', 'max_write_buffer_count', 'max_write_buffer_size', 'max_write_request_operation_count', 'max_write_request_size'];
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
        const method = 'PUT';
        const path = `/_ccr/auto_follow/${encodeURIComponent(params.name.toString())}`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async resumeAutoFollowPattern(params, options) {
        const acceptedPath = ['name'];
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
        const method = 'POST';
        const path = `/_ccr/auto_follow/${encodeURIComponent(params.name.toString())}/resume`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async resumeFollow(params, options) {
        const acceptedPath = ['index'];
        const acceptedBody = ['max_outstanding_read_requests', 'max_outstanding_write_requests', 'max_read_request_operation_count', 'max_read_request_size', 'max_retry_delay', 'max_write_buffer_count', 'max_write_buffer_size', 'max_write_request_operation_count', 'max_write_request_size', 'read_poll_timeout'];
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
        const method = 'POST';
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/resume_follow`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async stats(params, options) {
        const acceptedPath = [];
        const querystring = {};
        const body = undefined;
        params = params !== null && params !== void 0 ? params : {};
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
        const path = '/_ccr/stats';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async unfollow(params, options) {
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
        const method = 'POST';
        const path = `/${encodeURIComponent(params.index.toString())}/_ccr/unfollow`;
        return await this.transport.request({ path, method, querystring, body }, options);
    }
}
exports.default = Ccr;
//# sourceMappingURL=ccr.js.map