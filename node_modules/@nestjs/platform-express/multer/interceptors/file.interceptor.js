"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const multer = require("multer");
const files_constants_1 = require("../files.constants");
const multer_utils_1 = require("../multer/multer.utils");
/**
 * @param fieldName
 * @param localOptions
 *
 * @publicApi
 */
function FileInterceptor(fieldName, localOptions) {
    let MixinInterceptor = class MixinInterceptor {
        constructor(options = {}) {
            this.multer = multer({
                ...options,
                ...localOptions,
            });
        }
        async intercept(context, next) {
            const ctx = context.switchToHttp();
            await new Promise((resolve, reject) => this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (err) => {
                if (err) {
                    const error = (0, multer_utils_1.transformException)(err);
                    return reject(error);
                }
                resolve();
            }));
            return next.handle();
        }
    };
    MixinInterceptor = tslib_1.__decorate([
        tslib_1.__param(0, (0, common_1.Optional)()),
        tslib_1.__param(0, (0, common_1.Inject)(files_constants_1.MULTER_MODULE_OPTIONS)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], MixinInterceptor);
    const Interceptor = (0, common_1.mixin)(MixinInterceptor);
    return Interceptor;
}
exports.FileInterceptor = FileInterceptor;
