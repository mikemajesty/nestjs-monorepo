"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsHandler = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const select_exception_filter_metadata_util_1 = require("@nestjs/common/utils/select-exception-filter-metadata.util");
const base_exception_filter_1 = require("./base-exception-filter");
const invalid_exception_filter_exception_1 = require("../errors/exceptions/invalid-exception-filter.exception");
class ExceptionsHandler extends base_exception_filter_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.filters = [];
    }
    next(exception, ctx) {
        if (this.invokeCustomFilters(exception, ctx)) {
            return;
        }
        super.catch(exception, ctx);
    }
    setCustomFilters(filters) {
        if (!Array.isArray(filters)) {
            throw new invalid_exception_filter_exception_1.InvalidExceptionFilterException();
        }
        this.filters = filters;
    }
    invokeCustomFilters(exception, ctx) {
        if ((0, shared_utils_1.isEmpty)(this.filters)) {
            return false;
        }
        const filter = (0, select_exception_filter_metadata_util_1.selectExceptionFilterMetadata)(this.filters, exception);
        filter && filter.func(exception, ctx);
        return !!filter;
    }
}
exports.ExceptionsHandler = ExceptionsHandler;
