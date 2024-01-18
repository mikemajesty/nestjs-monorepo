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
class Cat {
    constructor(transport) {
        Object.defineProperty(this, "transport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.transport = transport;
    }
    async aliases(params, options) {
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
            path = `/_cat/aliases/${encodeURIComponent(params.name.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/aliases';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async allocation(params, options) {
        const acceptedPath = ['node_id'];
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
        if (params.node_id != null) {
            method = 'GET';
            path = `/_cat/allocation/${encodeURIComponent(params.node_id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/allocation';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async componentTemplates(params, options) {
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
            path = `/_cat/component_templates/${encodeURIComponent(params.name.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/component_templates';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async count(params, options) {
        const acceptedPath = ['index'];
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
        if (params.index != null) {
            method = 'GET';
            path = `/_cat/count/${encodeURIComponent(params.index.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/count';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async fielddata(params, options) {
        const acceptedPath = ['fields'];
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
        if (params.fields != null) {
            method = 'GET';
            path = `/_cat/fielddata/${encodeURIComponent(params.fields.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/fielddata';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async health(params, options) {
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
        const path = '/_cat/health';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async help(params, options) {
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
        const path = '/_cat';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async indices(params, options) {
        const acceptedPath = ['index'];
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
        if (params.index != null) {
            method = 'GET';
            path = `/_cat/indices/${encodeURIComponent(params.index.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/indices';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async master(params, options) {
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
        const path = '/_cat/master';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async mlDataFrameAnalytics(params, options) {
        const acceptedPath = ['id'];
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
        if (params.id != null) {
            method = 'GET';
            path = `/_cat/ml/data_frame/analytics/${encodeURIComponent(params.id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/ml/data_frame/analytics';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async mlDatafeeds(params, options) {
        const acceptedPath = ['datafeed_id'];
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
        if (params.datafeed_id != null) {
            method = 'GET';
            path = `/_cat/ml/datafeeds/${encodeURIComponent(params.datafeed_id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/ml/datafeeds';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async mlJobs(params, options) {
        const acceptedPath = ['job_id'];
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
        if (params.job_id != null) {
            method = 'GET';
            path = `/_cat/ml/anomaly_detectors/${encodeURIComponent(params.job_id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/ml/anomaly_detectors';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async mlTrainedModels(params, options) {
        const acceptedPath = ['model_id'];
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
        if (params.model_id != null) {
            method = 'GET';
            path = `/_cat/ml/trained_models/${encodeURIComponent(params.model_id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/ml/trained_models';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async nodeattrs(params, options) {
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
        const path = '/_cat/nodeattrs';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async nodes(params, options) {
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
        const path = '/_cat/nodes';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async pendingTasks(params, options) {
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
        const path = '/_cat/pending_tasks';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async plugins(params, options) {
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
        const path = '/_cat/plugins';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async recovery(params, options) {
        const acceptedPath = ['index'];
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
        if (params.index != null) {
            method = 'GET';
            path = `/_cat/recovery/${encodeURIComponent(params.index.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/recovery';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async repositories(params, options) {
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
        const path = '/_cat/repositories';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async segments(params, options) {
        const acceptedPath = ['index'];
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
        if (params.index != null) {
            method = 'GET';
            path = `/_cat/segments/${encodeURIComponent(params.index.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/segments';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async shards(params, options) {
        const acceptedPath = ['index'];
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
        if (params.index != null) {
            method = 'GET';
            path = `/_cat/shards/${encodeURIComponent(params.index.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/shards';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async snapshots(params, options) {
        const acceptedPath = ['repository'];
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
        if (params.repository != null) {
            method = 'GET';
            path = `/_cat/snapshots/${encodeURIComponent(params.repository.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/snapshots';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async tasks(params, options) {
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
        const path = '/_cat/tasks';
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async templates(params, options) {
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
            path = `/_cat/templates/${encodeURIComponent(params.name.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/templates';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async threadPool(params, options) {
        const acceptedPath = ['thread_pool_patterns'];
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
        if (params.thread_pool_patterns != null) {
            method = 'GET';
            path = `/_cat/thread_pool/${encodeURIComponent(params.thread_pool_patterns.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/thread_pool';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
    async transforms(params, options) {
        const acceptedPath = ['transform_id'];
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
        if (params.transform_id != null) {
            method = 'GET';
            path = `/_cat/transforms/${encodeURIComponent(params.transform_id.toString())}`;
        }
        else {
            method = 'GET';
            path = '/_cat/transforms';
        }
        return await this.transport.request({ path, method, querystring, body }, options);
    }
}
exports.default = Cat;
//# sourceMappingURL=cat.js.map