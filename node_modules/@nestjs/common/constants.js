"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTRY_PROVIDER_WATERMARK = exports.CATCH_WATERMARK = exports.CONTROLLER_WATERMARK = exports.INJECTABLE_WATERMARK = exports.VERSION_METADATA = exports.SSE_METADATA = exports.RESPONSE_PASSTHROUGH_METADATA = exports.REDIRECT_METADATA = exports.HEADERS_METADATA = exports.MODULE_PATH = exports.HTTP_CODE_METADATA = exports.RENDER_METADATA = exports.ENHANCER_KEY_TO_SUBTYPE_MAP = exports.EXCEPTION_FILTERS_METADATA = exports.INTERCEPTORS_METADATA = exports.GUARDS_METADATA = exports.PIPES_METADATA = exports.FILTER_CATCH_EXCEPTIONS = exports.CUSTOM_ROUTE_ARGS_METADATA = exports.ROUTE_ARGS_METADATA = exports.METHOD_METADATA = exports.SCOPE_OPTIONS_METADATA = exports.OPTIONAL_PROPERTY_DEPS_METADATA = exports.PROPERTY_DEPS_METADATA = exports.OPTIONAL_DEPS_METADATA = exports.SELF_DECLARED_DEPS_METADATA = exports.PARAMTYPES_METADATA = exports.PATH_METADATA = exports.HOST_METADATA = exports.GLOBAL_MODULE_METADATA = exports.MODULE_METADATA = void 0;
exports.MODULE_METADATA = {
    IMPORTS: 'imports',
    PROVIDERS: 'providers',
    CONTROLLERS: 'controllers',
    EXPORTS: 'exports',
};
exports.GLOBAL_MODULE_METADATA = '__module:global__';
exports.HOST_METADATA = 'host';
exports.PATH_METADATA = 'path';
exports.PARAMTYPES_METADATA = 'design:paramtypes';
exports.SELF_DECLARED_DEPS_METADATA = 'self:paramtypes';
exports.OPTIONAL_DEPS_METADATA = 'optional:paramtypes';
exports.PROPERTY_DEPS_METADATA = 'self:properties_metadata';
exports.OPTIONAL_PROPERTY_DEPS_METADATA = 'optional:properties_metadata';
exports.SCOPE_OPTIONS_METADATA = 'scope:options';
exports.METHOD_METADATA = 'method';
exports.ROUTE_ARGS_METADATA = '__routeArguments__';
exports.CUSTOM_ROUTE_ARGS_METADATA = '__customRouteArgs__';
exports.FILTER_CATCH_EXCEPTIONS = '__filterCatchExceptions__';
exports.PIPES_METADATA = '__pipes__';
exports.GUARDS_METADATA = '__guards__';
exports.INTERCEPTORS_METADATA = '__interceptors__';
exports.EXCEPTION_FILTERS_METADATA = '__exceptionFilters__';
exports.ENHANCER_KEY_TO_SUBTYPE_MAP = {
    [exports.GUARDS_METADATA]: 'guard',
    [exports.INTERCEPTORS_METADATA]: 'interceptor',
    [exports.PIPES_METADATA]: 'pipe',
    [exports.EXCEPTION_FILTERS_METADATA]: 'filter',
};
exports.RENDER_METADATA = '__renderTemplate__';
exports.HTTP_CODE_METADATA = '__httpCode__';
exports.MODULE_PATH = '__module_path__';
exports.HEADERS_METADATA = '__headers__';
exports.REDIRECT_METADATA = '__redirect__';
exports.RESPONSE_PASSTHROUGH_METADATA = '__responsePassthrough__';
exports.SSE_METADATA = '__sse__';
exports.VERSION_METADATA = '__version__';
exports.INJECTABLE_WATERMARK = '__injectable__';
exports.CONTROLLER_WATERMARK = '__controller__';
exports.CATCH_WATERMARK = '__catch__';
exports.ENTRY_PROVIDER_WATERMARK = '__entryProvider__';
