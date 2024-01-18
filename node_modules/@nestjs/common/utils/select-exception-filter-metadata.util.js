"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectExceptionFilterMetadata = void 0;
const selectExceptionFilterMetadata = (filters, exception) => filters.find(({ exceptionMetatypes }) => !exceptionMetatypes.length ||
    exceptionMetatypes.some(ExceptionMetaType => exception instanceof ExceptionMetaType));
exports.selectExceptionFilterMetadata = selectExceptionFilterMetadata;
