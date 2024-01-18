/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/cats-api/src/modules/cats/adapter.ts":
/*!***************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/adapter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ICatsRepository = void 0;
const modules_1 = __webpack_require__(/*! libs/modules */ "./libs/modules/index.ts");
class ICatsRepository extends modules_1.IRepository {
}
exports.ICatsRepository = ICatsRepository;


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/controller.ts":
/*!******************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/cats-api/src/modules/cats/adapter.ts");
const entity_1 = __webpack_require__(/*! ./entity */ "./apps/cats-api/src/modules/cats/entity.ts");
const swagger_2 = __webpack_require__(/*! ./swagger */ "./apps/cats-api/src/modules/cats/swagger.ts");
let CatsController = class CatsController {
    catRepository;
    constructor(catRepository) {
        this.catRepository = catRepository;
    }
    async save(model) {
        return await this.catRepository.create(model);
    }
};
exports.CatsController = CatsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.save[201]),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.save[401]),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.save[500]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof entity_1.CatsEntity !== "undefined" && entity_1.CatsEntity) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CatsController.prototype, "save", null);
exports.CatsController = CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, swagger_1.ApiTags)('cats'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.ICatsRepository !== "undefined" && adapter_1.ICatsRepository) === "function" ? _a : Object])
], CatsController);


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/entity.ts":
/*!**************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsEntity = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CatsEntity {
    name;
    age;
    status = 'pending';
    breed;
}
exports.CatsEntity = CatsEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cats name' }),
    __metadata("design:type", String)
], CatsEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cats age' }),
    __metadata("design:type", Number)
], CatsEntity.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cats status' }),
    __metadata("design:type", String)
], CatsEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cats breed' }),
    __metadata("design:type", String)
], CatsEntity.prototype, "breed", void 0);


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/module.ts":
/*!**************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const module_1 = __webpack_require__(/*! libs/modules/auth/token/module */ "./libs/modules/auth/token/module.ts");
const enum_1 = __webpack_require__(/*! libs/modules/database/enum */ "./libs/modules/database/enum.ts");
const module_2 = __webpack_require__(/*! libs/modules/http/module */ "./libs/modules/http/module.ts");
const is_logged_middleware_1 = __webpack_require__(/*! libs/utils/middleware/auth/is-logged.middleware */ "./libs/utils/middleware/auth/is-logged.middleware.ts");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/cats-api/src/modules/cats/adapter.ts");
const controller_1 = __webpack_require__(/*! ./controller */ "./apps/cats-api/src/modules/cats/controller.ts");
const repository_1 = __webpack_require__(/*! ./repository */ "./apps/cats-api/src/modules/cats/repository.ts");
const schema_1 = __webpack_require__(/*! ./schema */ "./apps/cats-api/src/modules/cats/schema.ts");
let CatsModule = class CatsModule {
    configure(consumer) {
        consumer.apply(is_logged_middleware_1.IsLoggedMiddleware).forRoutes({ path: '/cats', method: common_1.RequestMethod.ALL });
    }
};
exports.CatsModule = CatsModule;
exports.CatsModule = CatsModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.TokenModule, module_2.HttpModule],
        controllers: [controller_1.CatsController],
        providers: [
            {
                provide: adapter_1.ICatsRepository,
                useFactory: (connection) => new repository_1.CatsRepository(connection.model(schema_1.Cats.name, schema_1.CatSchema)),
                inject: [(0, mongoose_1.getConnectionToken)(enum_1.ConnectionName.CATS)],
            },
        ],
        exports: [adapter_1.ICatsRepository],
    })
], CatsModule);


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/repository.ts":
/*!******************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/repository.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const modules_1 = __webpack_require__(/*! libs/modules */ "./libs/modules/index.ts");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const schema_1 = __webpack_require__(/*! ./schema */ "./apps/cats-api/src/modules/cats/schema.ts");
let CatsRepository = class CatsRepository extends modules_1.Repository {
    entity;
    constructor(entity) {
        super(entity);
        this.entity = entity;
    }
};
exports.CatsRepository = CatsRepository;
exports.CatsRepository = CatsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Cats.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CatsRepository);


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/schema.ts":
/*!**************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/schema.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatSchema = exports.Cats = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let Cats = class Cats {
    name;
    age;
    breed;
};
exports.Cats = Cats;
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Cats.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Cats.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cats.prototype, "breed", void 0);
exports.Cats = Cats = __decorate([
    (0, mongoose_1.Schema)()
], Cats);
exports.CatSchema = mongoose_1.SchemaFactory.createForClass(Cats);


/***/ }),

/***/ "./apps/cats-api/src/modules/cats/swagger.ts":
/*!***************************************************!*\
  !*** ./apps/cats-api/src/modules/cats/swagger.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwagggerRequest = exports.SwagggerResponse = void 0;
const swagger_1 = __webpack_require__(/*! libs/utils/documentation/swagger */ "./libs/utils/documentation/swagger.ts");
exports.SwagggerResponse = {
    save: {
        201: swagger_1.Swagger.defaultResponseJSON({
            json: { id: '<id>', created: true },
            status: 201,
            description: 'save successfully',
        }),
        401: swagger_1.Swagger.defaultResponseError({
            status: 401,
            route: 'api/cats',
            description: 'unauthorized',
        }),
        500: swagger_1.Swagger.defaultResponseError({
            status: 500,
            route: 'api/cats',
            description: 'save unsuccessfully',
        }),
    },
};
class SwagggerRequest {
}
exports.SwagggerRequest = SwagggerRequest;


/***/ }),

/***/ "./apps/cats-api/src/modules/health/adapter.ts":
/*!*****************************************************!*\
  !*** ./apps/cats-api/src/modules/health/adapter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHealthService = void 0;
class IHealthService {
}
exports.IHealthService = IHealthService;


/***/ }),

/***/ "./apps/cats-api/src/modules/health/controller.ts":
/*!********************************************************!*\
  !*** ./apps/cats-api/src/modules/health/controller.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/cats-api/src/modules/health/adapter.ts");
const swagger_2 = __webpack_require__(/*! ./swagger */ "./apps/cats-api/src/modules/health/swagger.ts");
let HealthController = class HealthController {
    healthService;
    constructor(healthService) {
        this.healthService = healthService;
    }
    async getHealth() {
        return this.healthService.getText();
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('/health'),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.getHealth[200]),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.getHealth[500]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], HealthController.prototype, "getHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.IHealthService !== "undefined" && adapter_1.IHealthService) === "function" ? _a : Object])
], HealthController);


/***/ }),

/***/ "./apps/cats-api/src/modules/health/module.ts":
/*!****************************************************!*\
  !*** ./apps/cats-api/src/modules/health/module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const module_1 = __webpack_require__(/*! libs/modules/cache/module */ "./libs/modules/cache/module.ts");
const module_2 = __webpack_require__(/*! ../cats/module */ "./apps/cats-api/src/modules/cats/module.ts");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/cats-api/src/modules/health/adapter.ts");
const controller_1 = __webpack_require__(/*! ./controller */ "./apps/cats-api/src/modules/health/controller.ts");
const service_1 = __webpack_require__(/*! ./service */ "./apps/cats-api/src/modules/health/service.ts");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.RedisModule, module_2.CatsModule],
        controllers: [controller_1.HealthController],
        providers: [
            {
                provide: adapter_1.IHealthService,
                useClass: service_1.HealthService,
            },
        ],
    })
], HealthModule);


/***/ }),

/***/ "./apps/cats-api/src/modules/health/service.ts":
/*!*****************************************************!*\
  !*** ./apps/cats-api/src/modules/health/service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const package_json_1 = __webpack_require__(/*! apps/cats-api/package.json */ "./apps/cats-api/package.json");
const adapter_1 = __webpack_require__(/*! libs/modules/cache/adapter */ "./libs/modules/cache/adapter.ts");
const adapter_2 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const adapter_3 = __webpack_require__(/*! ../cats/adapter */ "./apps/cats-api/src/modules/cats/adapter.ts");
let HealthService = class HealthService {
    catsRepository;
    redisService;
    loggerService;
    constructor(catsRepository, redisService, loggerService) {
        this.catsRepository = catsRepository;
        this.redisService = redisService;
        this.loggerService = loggerService;
    }
    async getText() {
        const appName = `${package_json_1.name}-${package_json_1.version} UP!!`;
        await this.redisService.isConnected();
        await this.catsRepository.isConnected();
        this.loggerService.info({ message: appName });
        return appName;
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_3.ICatsRepository !== "undefined" && adapter_3.ICatsRepository) === "function" ? _a : Object, typeof (_b = typeof adapter_1.ICacheService !== "undefined" && adapter_1.ICacheService) === "function" ? _b : Object, typeof (_c = typeof adapter_2.ILoggerService !== "undefined" && adapter_2.ILoggerService) === "function" ? _c : Object])
], HealthService);


/***/ }),

/***/ "./apps/cats-api/src/modules/health/swagger.ts":
/*!*****************************************************!*\
  !*** ./apps/cats-api/src/modules/health/swagger.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwagggerRequest = exports.SwagggerResponse = void 0;
const package_json_1 = __webpack_require__(/*! apps/cats-api/package.json */ "./apps/cats-api/package.json");
const swagger_1 = __webpack_require__(/*! libs/utils/documentation/swagger */ "./libs/utils/documentation/swagger.ts");
exports.SwagggerResponse = {
    getHealth: {
        200: swagger_1.Swagger.defaultResponseText({ status: 200, text: `${package_json_1.name} UP!!` }),
        500: swagger_1.Swagger.defaultResponseError({
            status: 500,
            route: '/health',
        }),
    },
};
class SwagggerRequest {
}
exports.SwagggerRequest = SwagggerRequest;


/***/ }),

/***/ "./apps/cats-api/src/modules/module.ts":
/*!*********************************************!*\
  !*** ./apps/cats-api/src/modules/module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const modules_1 = __webpack_require__(/*! libs/modules */ "./libs/modules/index.ts");
const module_1 = __webpack_require__(/*! libs/modules/cache/module */ "./libs/modules/cache/module.ts");
const module_2 = __webpack_require__(/*! libs/modules/global/module */ "./libs/modules/global/module.ts");
const module_3 = __webpack_require__(/*! ../modules/cats/module */ "./apps/cats-api/src/modules/cats/module.ts");
const module_4 = __webpack_require__(/*! ./health/module */ "./apps/cats-api/src/modules/health/module.ts");
let MainModule = class MainModule {
};
exports.MainModule = MainModule;
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        imports: [module_4.HealthModule, module_2.GlobalModule, module_3.CatsModule, modules_1.CatsDatabaseModule, module_1.RedisModule],
    })
], MainModule);


/***/ }),

/***/ "./libs/modules/auth/token/adapter.ts":
/*!********************************************!*\
  !*** ./libs/modules/auth/token/adapter.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ITokenService = void 0;
class ITokenService {
}
exports.ITokenService = ITokenService;


/***/ }),

/***/ "./libs/modules/auth/token/module.ts":
/*!*******************************************!*\
  !*** ./libs/modules/auth/token/module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! libs/modules/global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const module_1 = __webpack_require__(/*! libs/modules/global/secrets/module */ "./libs/modules/global/secrets/module.ts");
const adapter_2 = __webpack_require__(/*! ./adapter */ "./libs/modules/auth/token/adapter.ts");
const service_1 = __webpack_require__(/*! ./service */ "./libs/modules/auth/token/service.ts");
let TokenModule = class TokenModule {
};
exports.TokenModule = TokenModule;
exports.TokenModule = TokenModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.SecretsModule],
        providers: [
            {
                provide: adapter_2.ITokenService,
                useFactory: (secret) => new service_1.TokenService(secret),
                inject: [adapter_1.ISecretsService],
            },
        ],
        exports: [adapter_2.ITokenService],
    })
], TokenModule);


/***/ }),

/***/ "./libs/modules/auth/token/service.ts":
/*!********************************************!*\
  !*** ./libs/modules/auth/token/service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TokenService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const adapter_1 = __webpack_require__(/*! libs/modules/global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const utils_1 = __webpack_require__(/*! libs/utils */ "./libs/utils/index.ts");
let TokenService = TokenService_1 = class TokenService {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    sign(model, options) {
        const token = jwt.sign(model, this.secret.authAPI.jwtToken, options || {
            expiresIn: 300,
        });
        return { token };
    }
    async verify(token) {
        return new Promise((res, rej) => {
            jwt.verify(token, this.secret.authAPI.jwtToken, (error, decoded) => {
                if (error)
                    rej(new utils_1.ApiException(error.message, common_1.HttpStatus.UNAUTHORIZED, `${TokenService_1.name}/${this.verify.name}`));
                res(decoded);
            });
        });
    }
    decode(token) {
        return jwt.decode(token);
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = TokenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.ISecretsService !== "undefined" && adapter_1.ISecretsService) === "function" ? _a : Object])
], TokenService);


/***/ }),

/***/ "./libs/modules/cache/adapter.ts":
/*!***************************************!*\
  !*** ./libs/modules/cache/adapter.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ICacheService = void 0;
class ICacheService {
}
exports.ICacheService = ICacheService;


/***/ }),

/***/ "./libs/modules/cache/module.ts":
/*!**************************************!*\
  !*** ./libs/modules/cache/module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! ../global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const adapter_2 = __webpack_require__(/*! ../global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const adapter_3 = __webpack_require__(/*! ./adapter */ "./libs/modules/cache/adapter.ts");
const service_1 = __webpack_require__(/*! ./service */ "./libs/modules/cache/service.ts");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: adapter_3.ICacheService,
                useFactory: async ({ REDIS_URL }, logger) => {
                    const cacheService = new service_1.RedisService({ url: REDIS_URL }, logger);
                    await cacheService.connect();
                    return cacheService;
                },
                inject: [adapter_2.ISecretsService, adapter_1.ILoggerService],
            },
        ],
        exports: [adapter_3.ICacheService],
    })
], RedisModule);


/***/ }),

/***/ "./libs/modules/cache/service.ts":
/*!***************************************!*\
  !*** ./libs/modules/cache/service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const exception_1 = __webpack_require__(/*! libs/utils/exception */ "./libs/utils/exception.ts");
const redis_1 = __webpack_require__(/*! redis */ "redis");
const adapter_1 = __webpack_require__(/*! ../global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
let RedisService = RedisService_1 = class RedisService {
    config;
    logger;
    client;
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.client = (0, redis_1.createClient)(this.config);
    }
    async isConnected() {
        const ping = await this.client.ping();
        if (ping !== 'PONG')
            this.throwException('redis disconnected.');
    }
    async connect() {
        await this.client.connect();
        this.logger.log('Redis connected!\n');
        return this.client;
    }
    async set(key, value, config) {
        const setResult = await this.client.set(key, value, config);
        if (setResult !== 'OK')
            this.throwException(`cache ${this.set.name} error: ${key} ${value}`);
    }
    async get(key) {
        const getResult = await this.client.get(key);
        if (!getResult)
            this.logger.warn({ message: `key: ${key} not found.`, context: RedisService_1.name });
        return getResult;
    }
    async del(key) {
        const deleted = await this.client.del(key);
        if (!deleted)
            this.throwException(`cache key: ${key} not deleted`);
    }
    async setMulti(redisList) {
        const multi = this.client.multi();
        for (const model of redisList) {
            multi.rPush(model.key, model.value);
        }
        await multi.exec();
    }
    async pExpire(key, miliseconds) {
        const expired = await this.client.pExpire(key, miliseconds);
        if (!expired)
            this.throwException(`set expire error key: ${key}`);
    }
    async hGet(key, field) {
        return await this.client.hGet(key, field);
    }
    async hSet(key, field, value) {
        return await this.client.hSet(key, field, value);
    }
    async hGetAll(key) {
        return await this.client.hGetAll(key);
    }
    throwException(error) {
        throw new exception_1.ApiException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR, RedisService_1.name);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_1.RedisClientOptions !== "undefined" && redis_1.RedisClientOptions) === "function" ? _a : Object, typeof (_b = typeof adapter_1.ILoggerService !== "undefined" && adapter_1.ILoggerService) === "function" ? _b : Object])
], RedisService);


/***/ }),

/***/ "./libs/modules/database/adapter.ts":
/*!******************************************!*\
  !*** ./libs/modules/database/adapter.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IRepository = exports.IDataBaseService = void 0;
class IDataBaseService {
}
exports.IDataBaseService = IDataBaseService;
class IRepository {
}
exports.IRepository = IRepository;


/***/ }),

/***/ "./libs/modules/database/connection/auth.ts":
/*!**************************************************!*\
  !*** ./libs/modules/database/connection/auth.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const adapter_1 = __webpack_require__(/*! ../../global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const module_1 = __webpack_require__(/*! ../../global/secrets/module */ "./libs/modules/global/secrets/module.ts");
const adapter_2 = __webpack_require__(/*! ../adapter */ "./libs/modules/database/adapter.ts");
const enum_1 = __webpack_require__(/*! ../enum */ "./libs/modules/database/enum.ts");
const repository_1 = __webpack_require__(/*! ../repository */ "./libs/modules/database/repository.ts");
const service_1 = __webpack_require__(/*! ../service */ "./libs/modules/database/service.ts");
let AuthDatabaseModule = class AuthDatabaseModule {
};
exports.AuthDatabaseModule = AuthDatabaseModule;
exports.AuthDatabaseModule = AuthDatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: adapter_2.IDataBaseService,
                useClass: service_1.DataBaseService,
            },
            {
                provide: adapter_2.IRepository,
                useClass: repository_1.Repository,
            },
        ],
        imports: [
            module_1.SecretsModule,
            mongoose_1.MongooseModule.forRootAsync({
                connectionName: enum_1.ConnectionName.AUTH,
                useFactory: ({ database: { host, port, pass, user } }) => new service_1.DataBaseService().getDefaultConnection({ dbName: enum_1.ConnectionName.AUTH, host, pass, port, user }),
                inject: [adapter_1.ISecretsService],
            }),
        ],
    })
], AuthDatabaseModule);


/***/ }),

/***/ "./libs/modules/database/connection/cats.ts":
/*!**************************************************!*\
  !*** ./libs/modules/database/connection/cats.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsDatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const adapter_1 = __webpack_require__(/*! ../../global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const module_1 = __webpack_require__(/*! ../../global/secrets/module */ "./libs/modules/global/secrets/module.ts");
const adapter_2 = __webpack_require__(/*! ../adapter */ "./libs/modules/database/adapter.ts");
const enum_1 = __webpack_require__(/*! ../enum */ "./libs/modules/database/enum.ts");
const repository_1 = __webpack_require__(/*! ../repository */ "./libs/modules/database/repository.ts");
const service_1 = __webpack_require__(/*! ../service */ "./libs/modules/database/service.ts");
let CatsDatabaseModule = class CatsDatabaseModule {
};
exports.CatsDatabaseModule = CatsDatabaseModule;
exports.CatsDatabaseModule = CatsDatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: adapter_2.IDataBaseService,
                useClass: service_1.DataBaseService,
            },
            {
                provide: adapter_2.IRepository,
                useClass: repository_1.Repository,
            },
        ],
        imports: [
            module_1.SecretsModule,
            mongoose_1.MongooseModule.forRootAsync({
                connectionName: enum_1.ConnectionName.CATS,
                useFactory: ({ database: { host, port, pass, user } }) => new service_1.DataBaseService().getDefaultConnection({ dbName: enum_1.ConnectionName.CATS, host, pass, user, port }),
                inject: [adapter_1.ISecretsService],
            }),
        ],
    })
], CatsDatabaseModule);


/***/ }),

/***/ "./libs/modules/database/enum.ts":
/*!***************************************!*\
  !*** ./libs/modules/database/enum.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionName = void 0;
var ConnectionName;
(function (ConnectionName) {
    ConnectionName["CATS"] = "monorepo_cats";
    ConnectionName["LOG"] = "monorepo_logs";
    ConnectionName["AUTH"] = "monorepo_auth";
})(ConnectionName || (exports.ConnectionName = ConnectionName = {}));


/***/ }),

/***/ "./libs/modules/database/repository.ts":
/*!*********************************************!*\
  !*** ./libs/modules/database/repository.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Repository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const utils_1 = __webpack_require__(/*! libs/utils */ "./libs/utils/index.ts");
class Repository {
    model;
    constructor(model) {
        this.model = model;
    }
    async isConnected() {
        if (this.model.db.readyState !== 1)
            throw new utils_1.ApiException(`db ${this.model.db.name} disconnected`, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Database');
    }
    async create(document, saveOptions) {
        const createdEntity = new this.model(document);
        const savedResult = await createdEntity.save(saveOptions);
        return { id: savedResult.id, created: !!savedResult.id };
    }
    async find(filter, options) {
        return await this.model.find(filter, undefined, options);
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOne(filter, options) {
        return await this.model.findOne(filter, undefined, options);
    }
    async findAll() {
        return await this.model.find();
    }
    async remove(filter) {
        const { deletedCount } = await this.model.deleteMany(filter);
        return { deletedCount, deleted: !!deletedCount };
    }
    async updateOne(filter, updated, options) {
        return await this.model.updateOne(filter, updated, options);
    }
    async updateMany(filter, updated, options) {
        return await this.model.updateMany(filter, updated, options);
    }
}
exports.Repository = Repository;


/***/ }),

/***/ "./libs/modules/database/service.ts":
/*!******************************************!*\
  !*** ./libs/modules/database/service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataBaseService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let DataBaseService = class DataBaseService {
    getDefaultConnection(config) {
        return {
            appName: 'monorepo',
            uri: this.getConnectionString(config),
        };
    }
    getConnectionString(config) {
        return `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000&authSource=admin&authMechanism=SCRAM-SHA-256`;
    }
};
exports.DataBaseService = DataBaseService;
exports.DataBaseService = DataBaseService = __decorate([
    (0, common_1.Injectable)()
], DataBaseService);


/***/ }),

/***/ "./libs/modules/database/types.ts":
/*!****************************************!*\
  !*** ./libs/modules/database/types.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/modules/global/logger/adapter.ts":
/*!***********************************************!*\
  !*** ./libs/modules/global/logger/adapter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ILoggerService = void 0;
class ILoggerService {
}
exports.ILoggerService = ILoggerService;


/***/ }),

/***/ "./libs/modules/global/logger/module.ts":
/*!**********************************************!*\
  !*** ./libs/modules/global/logger/module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! ../secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const adapter_2 = __webpack_require__(/*! ./adapter */ "./libs/modules/global/logger/adapter.ts");
const service_1 = __webpack_require__(/*! ./service */ "./libs/modules/global/logger/service.ts");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: adapter_2.ILoggerService,
                useFactory: ({ LOG_LEVEL, ELK_URL }) => {
                    const logger = new service_1.LoggerService(ELK_URL);
                    logger.connect(LOG_LEVEL);
                    return logger;
                },
                inject: [adapter_1.ISecretsService],
            },
        ],
        exports: [adapter_2.ILoggerService],
    })
], LoggerModule);


/***/ }),

/***/ "./libs/modules/global/logger/service.ts":
/*!***********************************************!*\
  !*** ./libs/modules/global/logger/service.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const convert_pino_request_to_curl_1 = __webpack_require__(/*! convert-pino-request-to-curl */ "convert-pino-request-to-curl");
const utils_1 = __webpack_require__(/*! libs/utils */ "./libs/utils/index.ts");
const luxon_1 = __webpack_require__(/*! luxon */ "luxon");
const pino_1 = __webpack_require__(/*! pino */ "pino");
const pino_http_1 = __webpack_require__(/*! pino-http */ "pino-http");
const pino_pretty_1 = __webpack_require__(/*! pino-pretty */ "pino-pretty");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const pinoElastic = __webpack_require__(/*! pino-elasticsearch */ "pino-elasticsearch");
let LoggerService = class LoggerService {
    elkUrl;
    pino;
    app;
    streamToElastic;
    constructor(elkUrl) {
        this.elkUrl = elkUrl;
        const index = `monorepo-logs-${this.getDateFormat(new Date(), 'yyyy-MM')}`;
        this.streamToElastic = pinoElastic({
            index,
            node: this.elkUrl,
            esVersion: 7,
            flushBytes: 1000,
        });
    }
    connect(logLevel) {
        const pinoLogger = (0, pino_1.pino)({
            level: [logLevel, 'trace'].find(Boolean).toString(),
        }, (0, pino_1.multistream)([
            {
                level: 'trace',
                stream: (0, pino_pretty_1.default)(this.getPinoConfig()),
            },
            { level: 'info', stream: this.streamToElastic },
        ]));
        this.pino = (0, pino_http_1.pinoHttp)(this.getPinoHttpConfig(pinoLogger));
    }
    setApplication(app) {
        this.app = app;
    }
    log(message) {
        this.pino.logger.trace((0, colorette_1.green)(message));
    }
    trace({ message, context, obj = {} }) {
        Object.assign(obj, { context });
        this.pino.logger.trace([obj, (0, colorette_1.gray)(message)].find(Boolean), (0, colorette_1.gray)(message));
    }
    info({ message, context, obj = {} }) {
        Object.assign(obj, { context });
        this.pino.logger.info([obj, (0, colorette_1.green)(message)].find(Boolean), (0, colorette_1.green)(message));
    }
    warn({ message, context, obj = {} }) {
        Object.assign(obj, { context });
        this.pino.logger.warn([obj, (0, colorette_1.yellow)(message)].find(Boolean), (0, colorette_1.yellow)(message));
    }
    error(error, message, context) {
        const errorResponse = this.getErrorResponse(error);
        const response = error?.name === utils_1.ApiException.name
            ? { statusCode: error['statusCode'], message: error?.message }
            : errorResponse?.value();
        const type = {
            Error: utils_1.ApiException.name,
        }[error?.name];
        this.pino.logger.error({
            ...response,
            context: [context, this.app].find(Boolean),
            type: [type, error?.name].find(Boolean),
            traceid: this.getTraceId(error),
            timestamp: this.getDateFormat(),
            application: this.app,
            stack: error.stack,
        }, (0, colorette_1.red)(message));
    }
    fatal(error, message, context) {
        this.pino.logger.fatal({
            ...error.getResponse(),
            context: [context, this.app].find(Boolean),
            type: error.name,
            traceid: this.getTraceId(error),
            timestamp: this.getDateFormat(),
            application: this.app,
            stack: error.stack,
        }, (0, colorette_1.red)(message));
    }
    getPinoConfig() {
        return {
            colorize: colorette_1.isColorSupported,
            levelFirst: true,
            ignore: 'pid,hostname',
            quietReqLogger: true,
            messageFormat: (log, messageKey) => {
                const message = log[String(messageKey)];
                if (this.app) {
                    return `[${this.app}] ${message}`;
                }
                return message;
            },
            customPrettifiers: {
                time: () => {
                    return `[${this.getDateFormat()}]`;
                },
            },
        };
    }
    getPinoHttpConfig(pinoLogger) {
        return {
            logger: pinoLogger,
            quietReqLogger: true,
            customSuccessMessage: (req, res) => {
                return `request ${res.statusCode >= 400 ? (0, colorette_1.red)('errro') : (0, colorette_1.green)('success')} with status code: ${res.statusCode}`;
            },
            customErrorMessage: (req, res, error) => {
                return `request ${(0, colorette_1.red)(error.name)} with status code: ${res.statusCode} `;
            },
            genReqId: (req) => {
                return req.headers.traceid;
            },
            customAttributeKeys: {
                req: 'request',
                res: 'response',
                err: 'error',
                responseTime: 'timeTaken',
                reqId: 'traceid',
            },
            serializers: {
                err: () => false,
                req: (request) => {
                    return {
                        method: request.method,
                        curl: convert_pino_request_to_curl_1.PinoRequestConverter.getCurl(request),
                    };
                },
                res: pino_1.pino.stdSerializers.res,
            },
            customProps: (req) => {
                const context = req.context;
                const traceid = [req?.headers?.traceid, req.id].find(Boolean);
                const path = `${req.protocol}://${req.headers.host}${req.url}`;
                this.pino.logger.setBindings({
                    traceid,
                    application: this.app,
                    context: context,
                    path,
                    timestamp: this.getDateFormat(),
                });
                return {
                    traceid,
                    application: this.app,
                    context: context,
                    path,
                    timestamp: this.getDateFormat(),
                };
            },
            customLogLevel: (req, res, error) => {
                if ([res.statusCode >= 400, error].some(Boolean)) {
                    return 'error';
                }
                if ([res.statusCode >= 300, res.statusCode <= 400].every(Boolean)) {
                    return 'silent';
                }
                return 'info';
            },
        };
    }
    getErrorResponse(error) {
        const isFunction = typeof error?.getResponse === 'function';
        return [
            {
                conditional: typeof error === 'string',
                value: () => new common_1.InternalServerErrorException(error).getResponse(),
            },
            {
                conditional: isFunction && typeof error.getResponse() === 'string',
                value: () => new utils_1.ApiException(error.getResponse(), [error.getStatus(), error['status']].find(Boolean), error['context']).getResponse(),
            },
            {
                conditional: isFunction && typeof error.getResponse() === 'object',
                value: () => error?.getResponse(),
            },
            {
                conditional: [error?.name === Error.name, error?.name == TypeError.name].some(Boolean),
                value: () => new common_1.InternalServerErrorException(error.message).getResponse(),
            },
        ].find((c) => c.conditional);
    }
    getDateFormat(date = new Date(), format = 'dd/MM/yyyy HH:mm:ss') {
        return luxon_1.DateTime.fromJSDate(date).setZone(process.env.TZ).toFormat(format);
    }
    getTraceId(error) {
        if (typeof error === 'string')
            return (0, uuid_1.v4)();
        return [error.traceid, this.pino.logger.bindings()?.tranceId].find(Boolean);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [String])
], LoggerService);


/***/ }),

/***/ "./libs/modules/global/module.ts":
/*!***************************************!*\
  !*** ./libs/modules/global/module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const module_1 = __webpack_require__(/*! ./logger/module */ "./libs/modules/global/logger/module.ts");
const module_2 = __webpack_require__(/*! ./secrets/module */ "./libs/modules/global/secrets/module.ts");
let GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule;
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [module_1.LoggerModule, module_2.SecretsModule],
        exports: [module_1.LoggerModule, module_2.SecretsModule],
    })
], GlobalModule);


/***/ }),

/***/ "./libs/modules/global/secrets/adapter.ts":
/*!************************************************!*\
  !*** ./libs/modules/global/secrets/adapter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ISecretsService = void 0;
class ISecretsService {
    ENV;
    REDIS_URL;
    ELK_URL;
    MONGO_EXPRESS_URL;
    JEAGER_URL;
    REDIS_COMMANDER_URL;
    KIBANA_URL;
    LOG_LEVEL;
    database;
    mainAPI;
    authAPI;
    GITHUB_SCRAP_API;
}
exports.ISecretsService = ISecretsService;


/***/ }),

/***/ "./libs/modules/global/secrets/enum.ts":
/*!*********************************************!*\
  !*** ./libs/modules/global/secrets/enum.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthAPIEnvironment = exports.CatsAPIEnvironment = void 0;
var CatsAPIEnvironment;
(function (CatsAPIEnvironment) {
    CatsAPIEnvironment["PORT"] = "PORT_CATS_API";
    CatsAPIEnvironment["URL"] = "CATS_API_URL";
})(CatsAPIEnvironment || (exports.CatsAPIEnvironment = CatsAPIEnvironment = {}));
var AuthAPIEnvironment;
(function (AuthAPIEnvironment) {
    AuthAPIEnvironment["PORT"] = "PORT_AUTH_API";
    AuthAPIEnvironment["SECRET_JWT"] = "SECRET_JWT";
    AuthAPIEnvironment["URL"] = "AUTH_API_URL";
})(AuthAPIEnvironment || (exports.AuthAPIEnvironment = AuthAPIEnvironment = {}));


/***/ }),

/***/ "./libs/modules/global/secrets/module.ts":
/*!***********************************************!*\
  !*** ./libs/modules/global/secrets/module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecretsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./libs/modules/global/secrets/adapter.ts");
const service_1 = __webpack_require__(/*! ./service */ "./libs/modules/global/secrets/service.ts");
let SecretsModule = class SecretsModule {
};
exports.SecretsModule = SecretsModule;
exports.SecretsModule = SecretsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
            }),
        ],
        providers: [
            {
                provide: adapter_1.ISecretsService,
                useClass: service_1.SecretsService,
            },
        ],
        exports: [adapter_1.ISecretsService],
    })
], SecretsModule);


/***/ }),

/***/ "./libs/modules/global/secrets/service.ts":
/*!************************************************!*\
  !*** ./libs/modules/global/secrets/service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecretsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const enum_1 = __webpack_require__(/*! ./enum */ "./libs/modules/global/secrets/enum.ts");
let SecretsService = class SecretsService extends config_1.ConfigService {
    constructor() {
        super();
    }
    ELK_URL = this.get('ELK_URL');
    MONGO_EXPRESS_URL = this.get('MONGO_EXPRESS_URL');
    REDIS_COMMANDER_URL = this.get('REDIS_COMMANDER_URL');
    JEAGER_URL = this.get('JEAGER_URL');
    KIBANA_URL = this.get('KIBANA_URL');
    REDIS_URL = this.get('REDIS_URL');
    ENV = this.get('ENV');
    LOG_LEVEL = this.get('LOG_LEVEL');
    database = {
        host: this.get('MONGO_HOST'),
        port: this.get('MONGO_PORT'),
        user: this.get('MONGO_INITDB_ROOT_USERNAME'),
        pass: this.get('MONGO_INITDB_ROOT_PASSWORD'),
    };
    mainAPI = {
        port: this.get(enum_1.CatsAPIEnvironment.PORT),
        url: this.get(enum_1.CatsAPIEnvironment.URL),
    };
    authAPI = {
        port: this.get(enum_1.AuthAPIEnvironment.PORT),
        jwtToken: this.get(enum_1.AuthAPIEnvironment.SECRET_JWT),
        url: this.get(enum_1.AuthAPIEnvironment.URL),
    };
    GITHUB_SCRAP_API = this.get('GITHUB_SCRAP_API');
};
exports.SecretsService = SecretsService;
exports.SecretsService = SecretsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SecretsService);


/***/ }),

/***/ "./libs/modules/http/adapter.ts":
/*!**************************************!*\
  !*** ./libs/modules/http/adapter.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHttpService = void 0;
class IHttpService {
}
exports.IHttpService = IHttpService;


/***/ }),

/***/ "./libs/modules/http/module.ts":
/*!*************************************!*\
  !*** ./libs/modules/http/module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./libs/modules/http/adapter.ts");
const service_1 = __webpack_require__(/*! ./service */ "./libs/modules/http/service.ts");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: adapter_1.IHttpService,
                useClass: service_1.HttpService,
            },
        ],
        exports: [adapter_1.IHttpService],
    })
], HttpModule);


/***/ }),

/***/ "./libs/modules/http/service.ts":
/*!**************************************!*\
  !*** ./libs/modules/http/service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const axios_1 = __webpack_require__(/*! axios */ "axios");
let HttpService = class HttpService {
    instance(config) {
        return axios_1.default.create([config, { timeout: 5000 }].find(Boolean));
    }
};
exports.HttpService = HttpService;
exports.HttpService = HttpService = __decorate([
    (0, common_1.Injectable)()
], HttpService);


/***/ }),

/***/ "./libs/modules/index.ts":
/*!*******************************!*\
  !*** ./libs/modules/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./database//repository */ "./libs/modules/database/repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/adapter */ "./libs/modules/database/adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/connection/auth */ "./libs/modules/database/connection/auth.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/connection/cats */ "./libs/modules/database/connection/cats.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/types */ "./libs/modules/database/types.ts"), exports);


/***/ }),

/***/ "./libs/utils/documentation/constants.ts":
/*!***********************************************!*\
  !*** ./libs/utils/documentation/constants.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_TAG = exports.SWAGGER_API_ROOT = void 0;
exports.SWAGGER_API_ROOT = 'docs';
exports.DEFAULT_TAG = 'Swagger Documentation';


/***/ }),

/***/ "./libs/utils/documentation/swagger.ts":
/*!*********************************************!*\
  !*** ./libs/utils/documentation/swagger.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Swagger = void 0;
const htttpStatus = __webpack_require__(/*! ../static/htttp-status.json */ "./libs/utils/static/htttp-status.json");
exports.Swagger = {
    defaultResponseError({ status, route, message, description }) {
        return {
            schema: {
                example: {
                    error: {
                        code: status,
                        traceid: '<traceid>',
                        message: [message, htttpStatus[String(status)]].find(Boolean),
                        timestamp: '<timestamp>',
                        path: route,
                    },
                },
            },
            description,
            status,
        };
    },
    defaultResponseText({ status, text, description }) {
        return {
            content: {
                'text/plain': {
                    schema: {
                        example: text,
                    },
                },
            },
            description,
            status,
        };
    },
    defaultResponseJSON({ status, json, description }) {
        return {
            content: {
                'application/json': {
                    schema: {
                        example: json,
                    },
                },
            },
            description,
            status,
        };
    },
    defaultRequestJSON(json) {
        return {
            schema: {
                example: json,
            },
        };
    },
};


/***/ }),

/***/ "./libs/utils/exception.ts":
/*!*********************************!*\
  !*** ./libs/utils/exception.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiException = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class ApiException extends common_1.HttpException {
    ctx;
    context;
    traceid;
    statusCode;
    code;
    config;
    user;
    constructor(error, status, ctx) {
        super(error, [status, 500].find(Boolean));
        this.ctx = ctx;
        this.statusCode = super.getStatus();
        if (ctx) {
            this.context = ctx;
        }
    }
}
exports.ApiException = ApiException;


/***/ }),

/***/ "./libs/utils/filters/http-exception.filter.ts":
/*!*****************************************************!*\
  !*** ./libs/utils/filters/http-exception.filter.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const luxon_1 = __webpack_require__(/*! luxon */ "luxon");
const errorStatus = __webpack_require__(/*! ../static/htttp-status.json */ "./libs/utils/static/htttp-status.json");
let AppExceptionFilter = class AppExceptionFilter {
    loggerService;
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : [exception['status'], common_1.HttpStatus.INTERNAL_SERVER_ERROR].find(Boolean);
        exception.traceid = [exception.traceid, request['id']].find(Boolean);
        this.loggerService.error(exception, exception.message, exception.context);
        response.status(status).json({
            error: {
                code: status,
                traceid: exception.traceid,
                message: [errorStatus[String(status)], exception.message].find(Boolean),
                timestamp: luxon_1.DateTime.fromJSDate(new Date()).setZone(process.env.TZ).toFormat('dd/MM/yyyy HH:mm:ss'),
                path: request.url,
            },
        });
    }
};
exports.AppExceptionFilter = AppExceptionFilter;
exports.AppExceptionFilter = AppExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.ILoggerService !== "undefined" && adapter_1.ILoggerService) === "function" ? _a : Object])
], AppExceptionFilter);


/***/ }),

/***/ "./libs/utils/index.ts":
/*!*****************************!*\
  !*** ./libs/utils/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./exception */ "./libs/utils/exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./request */ "./libs/utils/request.ts"), exports);


/***/ }),

/***/ "./libs/utils/interceptors/exception/http-exception.interceptor.ts":
/*!*************************************************************************!*\
  !*** ./libs/utils/interceptors/exception/http-exception.interceptor.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExceptionInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let ExceptionInterceptor = class ExceptionInterceptor {
    intercept(executionContext, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            error.status = [error.status, error?.response?.status, 500].find(Boolean);
            const isClassValidatorError = [
                error.status === common_1.HttpStatus.PRECONDITION_FAILED,
                Array.isArray(error?.response?.message),
            ].every(Boolean);
            if (isClassValidatorError) {
                error.message = error?.response?.message.join(', ');
                error.response.message = error.message;
            }
            const request = executionContext.switchToHttp().getRequest();
            const headers = executionContext.getArgs()[0]?.headers;
            error.user = headers.user;
            this.sanitizeExternalError(error);
            if (typeof error === 'object' && !error.traceid) {
                error.traceid = headers.traceid;
            }
            const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;
            if (request?.tracing) {
                request.tracing.setTag(request.tracing.tags.ERROR, true);
                request.tracing.setTag('message', error.message);
                request.tracing.setTag('statusCode', error.status);
                request.tracing.addTags({ traceId: error.traceid });
                request.tracing.finish();
            }
            error.context = error.context = context;
            throw error;
        }));
    }
    sanitizeExternalError(error) {
        if (typeof error?.response === 'object' && error?.isAxiosError) {
            error['getResponse'] = () => ({ ...error?.response?.data?.error });
            error['getStatus'] = () => [error?.response?.data?.error?.code, error?.status].find(Boolean);
            error.message = [error?.response?.data?.error?.message, error.message].find(Boolean);
            error.traceid = error?.response?.data?.error?.traceid;
        }
    }
};
exports.ExceptionInterceptor = ExceptionInterceptor;
exports.ExceptionInterceptor = ExceptionInterceptor = __decorate([
    (0, common_1.Injectable)()
], ExceptionInterceptor);


/***/ }),

/***/ "./libs/utils/interceptors/logger/http-logger.interceptor.ts":
/*!*******************************************************************!*\
  !*** ./libs/utils/interceptors/logger/http-logger.interceptor.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpLoggerInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let HttpLoggerInterceptor = class HttpLoggerInterceptor {
    loggerService;
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    intercept(executionContext, next) {
        const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;
        const request = executionContext.switchToHttp().getRequest();
        const response = executionContext.switchToHttp().getResponse();
        request['context'] = context;
        if (!request.headers?.traceid) {
            request.headers.traceid = (0, uuid_1.v4)();
            request.id = request.headers.traceid;
        }
        this.loggerService.pino(request, response);
        return next.handle();
    }
};
exports.HttpLoggerInterceptor = HttpLoggerInterceptor;
exports.HttpLoggerInterceptor = HttpLoggerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.ILoggerService !== "undefined" && adapter_1.ILoggerService) === "function" ? _a : Object])
], HttpLoggerInterceptor);


/***/ }),

/***/ "./libs/utils/interceptors/logger/http-tracing.interceptor.ts":
/*!********************************************************************!*\
  !*** ./libs/utils/interceptors/logger/http-tracing.interceptor.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TracingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const axios_1 = __webpack_require__(/*! axios */ "axios");
const jaeger_client_1 = __webpack_require__(/*! jaeger-client */ "jaeger-client");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const opentracing_1 = __webpack_require__(/*! opentracing */ "opentracing");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let TracingInterceptor = class TracingInterceptor {
    tracer;
    app;
    constructor({ app, version }, logger) {
        this.app = app;
        const config = {
            serviceName: app,
            sampler: {
                type: 'const',
                param: 1,
            },
        };
        const options = this.getTracingLogger(logger);
        options.tags = {
            version: version,
            app: app,
        };
        this.tracer = (0, jaeger_client_1.initTracer)(config, options);
    }
    intercept(executionContext, next) {
        const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;
        const request = executionContext.switchToHttp().getRequest();
        const res = executionContext.switchToHttp().getResponse();
        const parent = this.tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, request.headers);
        const parentObject = parent ? { childOf: parent } : {};
        const span = this.tracer.startSpan(request.headers.host + request.path, parentObject);
        const createJaegerInstance = () => {
            return {
                span: span,
                tracer: this.tracer,
                tags: opentracing_1.Tags,
                axios: (options = {}) => {
                    const headers = {};
                    this.tracer.inject(span, opentracing_1.FORMAT_HTTP_HEADERS, headers);
                    options.headers = { ...options.headers, ...headers, traceid: request.id };
                    return axios_1.default.create(options);
                },
                log: (eventName, payload) => {
                    span.logEvent(eventName, payload);
                },
                setTag: (key, value) => {
                    span.setTag(key, value);
                },
                addTags: (object) => {
                    span.addTags(object);
                },
                setTracingTag: (key, value) => {
                    span.setTag(key, value);
                },
                finish: () => {
                    span.finish();
                },
                createSpan: (name, parent) => {
                    const parentObject = parent ? { childOf: parent } : { childOf: span };
                    return this.tracer.startSpan(name, parentObject);
                },
            };
        };
        request.tracing = createJaegerInstance();
        request.tracing.setTag('ip', request.ip);
        request.tracing.setTag('app', this.app);
        request.tracing.setTag(opentracing_1.Tags.HTTP_METHOD, request.method);
        request.tracing.setTag('headers', request.headers);
        request.tracing.setTag('path', request.path);
        request.tracing.setTag('body', request.body);
        request.tracing.setTag('query', request.query);
        request.tracing.setTag('component', context);
        if (request.id) {
            request.tracing.setTag('traceId', request.id);
        }
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            request.tracing.setTag(opentracing_1.Tags.HTTP_STATUS_CODE, res.statusCode);
            request.tracing.finish();
        }));
    }
    getTracingLogger(logger) {
        return {
            logger: {
                info: (message) => {
                    logger.log(message);
                },
                error: (message) => {
                    logger.error(message);
                },
            },
        };
    }
};
exports.TracingInterceptor = TracingInterceptor;
exports.TracingInterceptor = TracingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof adapter_1.ILoggerService !== "undefined" && adapter_1.ILoggerService) === "function" ? _a : Object])
], TracingInterceptor);


/***/ }),

/***/ "./libs/utils/middleware/auth/is-logged.middleware.ts":
/*!************************************************************!*\
  !*** ./libs/utils/middleware/auth/is-logged.middleware.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsLoggedMiddleware = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_1 = __webpack_require__(/*! libs/modules/auth/token/adapter */ "./libs/modules/auth/token/adapter.ts");
const adapter_2 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let IsLoggedMiddleware = class IsLoggedMiddleware {
    tokenService;
    loggerService;
    constructor(tokenService, loggerService) {
        this.tokenService = tokenService;
        this.loggerService = loggerService;
    }
    async use(request, response, next) {
        const tokenHeader = request.headers.authorization;
        if (!tokenHeader) {
            if (!request.headers?.traceid) {
                request.headers.traceid = (0, uuid_1.v4)();
            }
            response.status(412);
            this.loggerService.pino(request, response);
            throw new common_1.UnauthorizedException('no token provided');
        }
        const token = tokenHeader.split(' ')[1];
        const userDecoded = await this.tokenService.verify(token).catch((error) => {
            const tokenDecoded = this.tokenService.decode(token);
            error.user = tokenDecoded?.userId;
            if (!request.headers?.traceid) {
                request.headers.traceid = (0, uuid_1.v4)();
            }
            this.loggerService.pino(request, response);
            next(error);
        });
        request.headers.user = userDecoded?.userId;
        next();
    }
};
exports.IsLoggedMiddleware = IsLoggedMiddleware;
exports.IsLoggedMiddleware = IsLoggedMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.ITokenService !== "undefined" && adapter_1.ITokenService) === "function" ? _a : Object, typeof (_b = typeof adapter_2.ILoggerService !== "undefined" && adapter_2.ILoggerService) === "function" ? _b : Object])
], IsLoggedMiddleware);


/***/ }),

/***/ "./libs/utils/request.ts":
/*!*******************************!*\
  !*** ./libs/utils/request.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "colorette":
/*!****************************!*\
  !*** external "colorette" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("colorette");

/***/ }),

/***/ "convert-pino-request-to-curl":
/*!***********************************************!*\
  !*** external "convert-pino-request-to-curl" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("convert-pino-request-to-curl");

/***/ }),

/***/ "jaeger-client":
/*!********************************!*\
  !*** external "jaeger-client" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("jaeger-client");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "luxon":
/*!************************!*\
  !*** external "luxon" ***!
  \************************/
/***/ ((module) => {

module.exports = require("luxon");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "opentracing":
/*!******************************!*\
  !*** external "opentracing" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("opentracing");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ "pino-elasticsearch":
/*!*************************************!*\
  !*** external "pino-elasticsearch" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("pino-elasticsearch");

/***/ }),

/***/ "pino-http":
/*!****************************!*\
  !*** external "pino-http" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("pino-http");

/***/ }),

/***/ "pino-pretty":
/*!******************************!*\
  !*** external "pino-pretty" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("pino-pretty");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "./apps/cats-api/package.json":
/*!************************************!*\
  !*** ./apps/cats-api/package.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@app/cats.api","version":"v0.0.22","description":"monorepo cats-api","main":"main","scripts":{"format":"../../tools/eslint/node_modules/.bin/prettier --write \\"**/*.{ts, js, json}\\"","test":"../../node_modules/jest/bin/jest.js --maxWorkers=50%","lint":"yarn format && ../../tools/eslint/node_modules/.bin/eslint \\"src/**/*.{ts, js, json}\\" --fix"},"author":{"name":"Mike Lima","email":"mike.rodrigues.lima@gmail.com"},"engines":{"node":"18"},"license":"MIT"}');

/***/ }),

/***/ "./libs/utils/static/htttp-status.json":
/*!*********************************************!*\
  !*** ./libs/utils/static/htttp-status.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"400":"Bad Request","401":"Unauthorized","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","408":"Request Timeout","413":"Payload Too Large","414":"URI Too Long","422":"Unprocessable Entity","428":"Precondition Required","429":"Too Many Requests","500":"Internal Server Error.","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","507":"Insufficient Storage","508":"Loop Detected","ECONNREFUSED":"Connection Refused"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./apps/cats-api/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const package_json_1 = __webpack_require__(/*! apps/cats-api/package.json */ "./apps/cats-api/package.json");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const adapter_2 = __webpack_require__(/*! libs/modules/global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const constants_1 = __webpack_require__(/*! libs/utils/documentation/constants */ "./libs/utils/documentation/constants.ts");
const http_exception_filter_1 = __webpack_require__(/*! libs/utils/filters/http-exception.filter */ "./libs/utils/filters/http-exception.filter.ts");
const http_exception_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/exception/http-exception.interceptor */ "./libs/utils/interceptors/exception/http-exception.interceptor.ts");
const http_logger_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/logger/http-logger.interceptor */ "./libs/utils/interceptors/logger/http-logger.interceptor.ts");
const http_tracing_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/logger/http-tracing.interceptor */ "./libs/utils/interceptors/logger/http-tracing.interceptor.ts");
const module_1 = __webpack_require__(/*! ./modules/module */ "./apps/cats-api/src/modules/module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(module_1.MainModule, {
        bufferLogs: true,
        cors: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: common_1.HttpStatus.PRECONDITION_FAILED,
    }));
    const loggerService = app.get(adapter_1.ILoggerService);
    loggerService.setApplication(package_json_1.name);
    app.useGlobalFilters(new http_exception_filter_1.AppExceptionFilter(loggerService));
    app.useGlobalInterceptors(new http_exception_interceptor_1.ExceptionInterceptor(), new http_logger_interceptor_1.HttpLoggerInterceptor(loggerService), new http_tracing_interceptor_1.TracingInterceptor({ app: package_json_1.name, version: package_json_1.version }, loggerService));
    const { mainAPI: { port: PORT, url }, ENV, KIBANA_URL, JEAGER_URL, MONGO_EXPRESS_URL, REDIS_COMMANDER_URL, } = app.get(adapter_2.ISecretsService);
    app.useLogger(loggerService);
    app.setGlobalPrefix('api', {
        exclude: [{ path: 'health', method: common_1.RequestMethod.GET }],
    });
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle(package_json_1.name)
        .setDescription(package_json_1.description)
        .setVersion(package_json_1.version)
        .addTag(constants_1.DEFAULT_TAG)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(constants_1.SWAGGER_API_ROOT, app, document);
    loggerService.log(`🟢 ${package_json_1.name} listening at ${(0, colorette_1.bold)(PORT)} on ${(0, colorette_1.bold)(ENV?.toUpperCase())} 🟢\n`);
    await app.listen(PORT);
    const openApiURL = `${url}/${constants_1.SWAGGER_API_ROOT}`;
    loggerService.log(`🔵 swagger listening at ${(0, colorette_1.bold)(openApiURL)}`);
    loggerService.log(`🔵 mongo-express listening at ${(0, colorette_1.bold)(MONGO_EXPRESS_URL)}`);
    loggerService.log(`🔵 redis-commander listening at ${(0, colorette_1.bold)(REDIS_COMMANDER_URL)}`);
    loggerService.log(`🔵 kibana listening at ${(0, colorette_1.bold)(KIBANA_URL)}`);
    loggerService.log(`🔵 jeager listening at ${(0, colorette_1.bold)(JEAGER_URL)}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ2hFLGFBQWEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLG9CQUFJLEVBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbW9kdWxlcy9jYXRzL2FkYXB0ZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2NhdHMtYXBpL3NyYy9tb2R1bGVzL2NhdHMvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvY2F0cy1hcGkvc3JjL21vZHVsZXMvY2F0cy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2NhdHMtYXBpL3NyYy9tb2R1bGVzL2NhdHMvbW9kdWxlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbW9kdWxlcy9jYXRzL3JlcG9zaXRvcnkudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2NhdHMtYXBpL3NyYy9tb2R1bGVzL2NhdHMvc2NoZW1hLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbW9kdWxlcy9jYXRzL3N3YWdnZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2NhdHMtYXBpL3NyYy9tb2R1bGVzL2hlYWx0aC9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbW9kdWxlcy9oZWFsdGgvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvY2F0cy1hcGkvc3JjL21vZHVsZXMvaGVhbHRoL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvY2F0cy1hcGkvc3JjL21vZHVsZXMvaGVhbHRoL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2NhdHMtYXBpL3NyYy9tb2R1bGVzL2hlYWx0aC9zd2FnZ2VyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbW9kdWxlcy9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvYXV0aC90b2tlbi9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vbW9kdWxlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9jYWNoZS9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2NhY2hlL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9jYWNoZS9zZXJ2aWNlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2RhdGFiYXNlL2FkYXB0ZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZGF0YWJhc2UvY29ubmVjdGlvbi9hdXRoLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2RhdGFiYXNlL2Nvbm5lY3Rpb24vY2F0cy50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9kYXRhYmFzZS9lbnVtLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2RhdGFiYXNlL3JlcG9zaXRvcnkudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZGF0YWJhc2Uvc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9kYXRhYmFzZS90eXBlcy50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9zZXJ2aWNlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2dsb2JhbC9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL3NlY3JldHMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9lbnVtLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2dsb2JhbC9zZWNyZXRzL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9zZXJ2aWNlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2h0dHAvYWRhcHRlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9odHRwL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9odHRwL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2RvY3VtZW50YXRpb24vY29uc3RhbnRzLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9kb2N1bWVudGF0aW9uL3N3YWdnZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvdXRpbHMvZmlsdGVycy9odHRwLWV4Y2VwdGlvbi5maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9pbnRlcmNlcHRvcnMvZXhjZXB0aW9uL2h0dHAtZXhjZXB0aW9uLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9pbnRlcmNlcHRvcnMvbG9nZ2VyL2h0dHAtbG9nZ2VyLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9pbnRlcmNlcHRvcnMvbG9nZ2VyL2h0dHAtdHJhY2luZy5pbnRlcmNlcHRvci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvdXRpbHMvbWlkZGxld2FyZS9hdXRoL2lzLWxvZ2dlZC5taWRkbGV3YXJlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9yZXF1ZXN0LnRzIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb21tb25cIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvY29uZmlnXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvbW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvc3dhZ2dlclwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcImNvbG9yZXR0ZVwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiY29udmVydC1waW5vLXJlcXVlc3QtdG8tY3VybFwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiamFlZ2VyLWNsaWVudFwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJsdXhvblwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIm9wZW50cmFjaW5nXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJwaW5vXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJwaW5vLWVsYXN0aWNzZWFyY2hcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcInBpbm8taHR0cFwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwicGluby1wcmV0dHlcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcInJlZGlzXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJyeGpzXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJyeGpzL29wZXJhdG9yc1wiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwidXVpZFwiIiwid2VicGFjazovL21vbm9yZXBvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9jYXRzLWFwaS9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUmVwb3NpdG9yeSB9IGZyb20gJ2xpYnMvbW9kdWxlcyc7XG5cbmltcG9ydCB7IENhdERvY3VtZW50IH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSUNhdHNSZXBvc2l0b3J5IGV4dGVuZHMgSVJlcG9zaXRvcnk8Q2F0RG9jdW1lbnQ+IHt9XG4iLCJpbXBvcnQgeyBCb2R5LCBDb250cm9sbGVyLCBQb3N0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBpQmVhcmVyQXV0aCwgQXBpUmVzcG9uc2UsIEFwaVRhZ3MgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQ3JlYXRlZE1vZGVsIH0gZnJvbSAnbGlicy9tb2R1bGVzJztcblxuaW1wb3J0IHsgSUNhdHNSZXBvc2l0b3J5IH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IENhdHNFbnRpdHkgfSBmcm9tICcuL2VudGl0eSc7XG5pbXBvcnQgeyBTd2FnZ2dlclJlc3BvbnNlIH0gZnJvbSAnLi9zd2FnZ2VyJztcblxuQENvbnRyb2xsZXIoJ2NhdHMnKVxuQEFwaVRhZ3MoJ2NhdHMnKVxuQEFwaUJlYXJlckF1dGgoKVxuZXhwb3J0IGNsYXNzIENhdHNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjYXRSZXBvc2l0b3J5OiBJQ2F0c1JlcG9zaXRvcnkpIHt9XG5cbiAgQFBvc3QoKVxuICBAQXBpUmVzcG9uc2UoU3dhZ2dnZXJSZXNwb25zZS5zYXZlWzIwMV0pXG4gIEBBcGlSZXNwb25zZShTd2FnZ2dlclJlc3BvbnNlLnNhdmVbNDAxXSlcbiAgQEFwaVJlc3BvbnNlKFN3YWdnZ2VyUmVzcG9uc2Uuc2F2ZVs1MDBdKVxuICBhc3luYyBzYXZlKEBCb2R5KCkgbW9kZWw6IENhdHNFbnRpdHkpOiBQcm9taXNlPENyZWF0ZWRNb2RlbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmNhdFJlcG9zaXRvcnkuY3JlYXRlKG1vZGVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBpUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuXG5pbXBvcnQgeyBDYXRzIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgY2xhc3MgQ2F0c0VudGl0eSBpbXBsZW1lbnRzIENhdHMge1xuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ0NhdHMgbmFtZScgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAnQ2F0cyBhZ2UnIH0pXG4gIGFnZTogbnVtYmVyO1xuXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAnQ2F0cyBzdGF0dXMnIH0pXG4gIHN0YXR1czogJ2Fwcm92ZWQnIHwgJ3BlbmRpbmcnID0gJ3BlbmRpbmcnO1xuXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAnQ2F0cyBicmVlZCcgfSlcbiAgYnJlZWQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IE1pZGRsZXdhcmVDb25zdW1lciwgTW9kdWxlLCBOZXN0TW9kdWxlLCBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGlvblRva2VuIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBUb2tlbk1vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9hdXRoL3Rva2VuL21vZHVsZSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uTmFtZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9kYXRhYmFzZS9lbnVtJztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMvaHR0cC9tb2R1bGUnO1xuaW1wb3J0IHsgSXNMb2dnZWRNaWRkbGV3YXJlIH0gZnJvbSAnbGlicy91dGlscy9taWRkbGV3YXJlL2F1dGgvaXMtbG9nZ2VkLm1pZGRsZXdhcmUnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiwgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5cbmltcG9ydCB7IElDYXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBDYXRzQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgeyBDYXRzUmVwb3NpdG9yeSB9IGZyb20gJy4vcmVwb3NpdG9yeSc7XG5pbXBvcnQgeyBDYXREb2N1bWVudCwgQ2F0cywgQ2F0U2NoZW1hIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1Rva2VuTW9kdWxlLCBIdHRwTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtDYXRzQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElDYXRzUmVwb3NpdG9yeSxcbiAgICAgIHVzZUZhY3Rvcnk6IChjb25uZWN0aW9uOiBDb25uZWN0aW9uKSA9PlxuICAgICAgICBuZXcgQ2F0c1JlcG9zaXRvcnkoY29ubmVjdGlvbi5tb2RlbChDYXRzLm5hbWUsIENhdFNjaGVtYSkgYXMgdW5rbm93biBhcyBNb2RlbDxDYXREb2N1bWVudD4pLFxuICAgICAgaW5qZWN0OiBbZ2V0Q29ubmVjdGlvblRva2VuKENvbm5lY3Rpb25OYW1lLkNBVFMpXSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbSUNhdHNSZXBvc2l0b3J5XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2F0c01vZHVsZSBpbXBsZW1lbnRzIE5lc3RNb2R1bGUge1xuICBjb25maWd1cmUoY29uc3VtZXI6IE1pZGRsZXdhcmVDb25zdW1lcik6IHZvaWQge1xuICAgIGNvbnN1bWVyLmFwcGx5KElzTG9nZ2VkTWlkZGxld2FyZSkuZm9yUm91dGVzKHsgcGF0aDogJy9jYXRzJywgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLkFMTCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEluamVjdE1vZGVsIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSAnbGlicy9tb2R1bGVzJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5pbXBvcnQgeyBJQ2F0c1JlcG9zaXRvcnkgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgQ2F0RG9jdW1lbnQsIENhdHMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRzUmVwb3NpdG9yeSBleHRlbmRzIFJlcG9zaXRvcnk8Q2F0RG9jdW1lbnQ+IGltcGxlbWVudHMgSUNhdHNSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoQEluamVjdE1vZGVsKENhdHMubmFtZSkgcHJpdmF0ZSByZWFkb25seSBlbnRpdHk6IE1vZGVsPENhdERvY3VtZW50Pikge1xuICAgIHN1cGVyKGVudGl0eSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb3AsIFNjaGVtYSwgU2NoZW1hRmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgRG9jdW1lbnQgfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCB0eXBlIENhdERvY3VtZW50ID0gQ2F0cyAmIERvY3VtZW50O1xuXG5AU2NoZW1hKClcbmV4cG9ydCBjbGFzcyBDYXRzIHtcbiAgQFByb3AoeyBpbmRleDogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQFByb3AoKVxuICBhZ2U6IG51bWJlcjtcblxuICBAUHJvcCgpXG4gIGJyZWVkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBDYXRTY2hlbWEgPSBTY2hlbWFGYWN0b3J5LmNyZWF0ZUZvckNsYXNzKENhdHMpO1xuIiwiaW1wb3J0IHsgQ3JlYXRlZE1vZGVsIH0gZnJvbSAnbGlicy9tb2R1bGVzJztcbmltcG9ydCB7IFN3YWdnZXIgfSBmcm9tICdsaWJzL3V0aWxzL2RvY3VtZW50YXRpb24vc3dhZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBTd2FnZ2dlclJlc3BvbnNlID0ge1xuICBzYXZlOiB7XG4gICAgMjAxOiBTd2FnZ2VyLmRlZmF1bHRSZXNwb25zZUpTT04oe1xuICAgICAganNvbjogeyBpZDogJzxpZD4nLCBjcmVhdGVkOiB0cnVlIH0gYXMgQ3JlYXRlZE1vZGVsLFxuICAgICAgc3RhdHVzOiAyMDEsXG4gICAgICBkZXNjcmlwdGlvbjogJ3NhdmUgc3VjY2Vzc2Z1bGx5JyxcbiAgICB9KSxcbiAgICA0MDE6IFN3YWdnZXIuZGVmYXVsdFJlc3BvbnNlRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICByb3V0ZTogJ2FwaS9jYXRzJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAndW5hdXRob3JpemVkJyxcbiAgICB9KSxcbiAgICA1MDA6IFN3YWdnZXIuZGVmYXVsdFJlc3BvbnNlRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICByb3V0ZTogJ2FwaS9jYXRzJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnc2F2ZSB1bnN1Y2Nlc3NmdWxseScsXG4gICAgfSksXG4gIH0sXG59O1xuXG5leHBvcnQgY2xhc3MgU3dhZ2dnZXJSZXF1ZXN0IHtcbiAgLyoqIElmIHJlcXVlc3RlcnMgaGFzIGEgYm9keS4gICovXG59XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgSUhlYWx0aFNlcnZpY2Uge1xuICBhYnN0cmFjdCBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPjtcbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFwaVJlc3BvbnNlLCBBcGlUYWdzIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcblxuaW1wb3J0IHsgSUhlYWx0aFNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgU3dhZ2dnZXJSZXNwb25zZSB9IGZyb20gJy4vc3dhZ2dlcic7XG5cbkBDb250cm9sbGVyKClcbkBBcGlUYWdzKCdoZWFsdGgnKVxuZXhwb3J0IGNsYXNzIEhlYWx0aENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGhlYWx0aFNlcnZpY2U6IElIZWFsdGhTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoJy9oZWFsdGgnKVxuICBAQXBpUmVzcG9uc2UoU3dhZ2dnZXJSZXNwb25zZS5nZXRIZWFsdGhbMjAwXSlcbiAgQEFwaVJlc3BvbnNlKFN3YWdnZ2VyUmVzcG9uc2UuZ2V0SGVhbHRoWzUwMF0pXG4gIGFzeW5jIGdldEhlYWx0aCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmhlYWx0aFNlcnZpY2UuZ2V0VGV4dCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWRpc01vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9jYWNoZS9tb2R1bGUnO1xuXG5pbXBvcnQgeyBDYXRzTW9kdWxlIH0gZnJvbSAnLi4vY2F0cy9tb2R1bGUnO1xuaW1wb3J0IHsgSUhlYWx0aFNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgSGVhbHRoQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgeyBIZWFsdGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtSZWRpc01vZHVsZSwgQ2F0c01vZHVsZV0sXG4gIGNvbnRyb2xsZXJzOiBbSGVhbHRoQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElIZWFsdGhTZXJ2aWNlLFxuICAgICAgdXNlQ2xhc3M6IEhlYWx0aFNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSGVhbHRoTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgbmFtZSwgdmVyc2lvbiB9IGZyb20gJ2FwcHMvY2F0cy1hcGkvcGFja2FnZS5qc29uJztcbmltcG9ydCB7IElDYWNoZVNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvY2FjaGUvYWRhcHRlcic7XG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXInO1xuXG5pbXBvcnQgeyBJQ2F0c1JlcG9zaXRvcnkgfSBmcm9tICcuLi9jYXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUhlYWx0aFNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhbHRoU2VydmljZSBpbXBsZW1lbnRzIElIZWFsdGhTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXRzUmVwb3NpdG9yeTogSUNhdHNSZXBvc2l0b3J5LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVkaXNTZXJ2aWNlOiBJQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyU2VydmljZTogSUxvZ2dlclNlcnZpY2UsXG4gICkge31cblxuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBwTmFtZSA9IGAke25hbWV9LSR7dmVyc2lvbn0gVVAhIWA7XG5cbiAgICBhd2FpdCB0aGlzLnJlZGlzU2VydmljZS5pc0Nvbm5lY3RlZCgpO1xuICAgIGF3YWl0IHRoaXMuY2F0c1JlcG9zaXRvcnkuaXNDb25uZWN0ZWQoKTtcblxuICAgIHRoaXMubG9nZ2VyU2VydmljZS5pbmZvKHsgbWVzc2FnZTogYXBwTmFtZSB9KTtcblxuICAgIHJldHVybiBhcHBOYW1lO1xuICB9XG59XG4iLCJpbXBvcnQgeyBuYW1lIH0gZnJvbSAnYXBwcy9jYXRzLWFwaS9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgU3dhZ2dlciB9IGZyb20gJ2xpYnMvdXRpbHMvZG9jdW1lbnRhdGlvbi9zd2FnZ2VyJztcblxuZXhwb3J0IGNvbnN0IFN3YWdnZ2VyUmVzcG9uc2UgPSB7XG4gIGdldEhlYWx0aDoge1xuICAgIDIwMDogU3dhZ2dlci5kZWZhdWx0UmVzcG9uc2VUZXh0KHsgc3RhdHVzOiAyMDAsIHRleHQ6IGAke25hbWV9IFVQISFgIH0pLFxuICAgIDUwMDogU3dhZ2dlci5kZWZhdWx0UmVzcG9uc2VFcnJvcih7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIHJvdXRlOiAnL2hlYWx0aCcsXG4gICAgfSksXG4gIH0sXG59O1xuXG5leHBvcnQgY2xhc3MgU3dhZ2dnZXJSZXF1ZXN0IHtcbiAgLyoqIElmIHJlcXVlc3RlcnMgaGFzIGEgYm9keS4gICovXG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDYXRzRGF0YWJhc2VNb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMnO1xuaW1wb3J0IHsgUmVkaXNNb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMvY2FjaGUvbW9kdWxlJztcbmltcG9ydCB7IEdsb2JhbE1vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvbW9kdWxlJztcblxuaW1wb3J0IHsgQ2F0c01vZHVsZSB9IGZyb20gJy4uL21vZHVsZXMvY2F0cy9tb2R1bGUnO1xuaW1wb3J0IHsgSGVhbHRoTW9kdWxlIH0gZnJvbSAnLi9oZWFsdGgvbW9kdWxlJztcbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbSGVhbHRoTW9kdWxlLCBHbG9iYWxNb2R1bGUsIENhdHNNb2R1bGUsIENhdHNEYXRhYmFzZU1vZHVsZSwgUmVkaXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluTW9kdWxlIHt9XG4iLCJpbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcblxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElUb2tlblNlcnZpY2Uge1xuICBhYnN0cmFjdCBzaWduPFQgPSBqd3QuU2lnbk9wdGlvbnM+KG1vZGVsOiBvYmplY3QsIG9wdGlvbnM/OiBUKTogVG9rZW47XG4gIGFic3RyYWN0IHZlcmlmeTxUID0gand0Lkp3dFBheWxvYWQ+KHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPFQgfCBzdHJpbmcgfCB1bmtub3duPjtcbiAgYWJzdHJhY3QgZGVjb2RlPFQgPSBqd3QuSnd0UGF5bG9hZD4odG9rZW46IHN0cmluZyk6IFQgfCBzdHJpbmcgfCB1bmtub3duO1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSVNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2dsb2JhbC9zZWNyZXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgU2VjcmV0c01vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9tb2R1bGUnO1xuXG5pbXBvcnQgeyBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2VjcmV0c01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElUb2tlblNlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiAoc2VjcmV0OiBJU2VjcmV0c1NlcnZpY2UpID0+IG5ldyBUb2tlblNlcnZpY2Uoc2VjcmV0KSxcbiAgICAgIGluamVjdDogW0lTZWNyZXRzU2VydmljZV0sXG4gICAgfSxcbiAgXSxcbiAgZXhwb3J0czogW0lUb2tlblNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2tlbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSHR0cFN0YXR1cywgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCAqIGFzIGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHsgSVNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2dsb2JhbC9zZWNyZXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnbGlicy91dGlscyc7XG5cbmltcG9ydCB7IElUb2tlblNlcnZpY2UgYXMgSVRva2VuU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIGltcGxlbWVudHMgSVRva2VuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2VjcmV0OiBJU2VjcmV0c1NlcnZpY2UpIHt9XG5cbiAgc2lnbihtb2RlbDogb2JqZWN0LCBvcHRpb25zPzogand0LlNpZ25PcHRpb25zKTogVG9rZW4ge1xuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXG4gICAgICBtb2RlbCxcbiAgICAgIHRoaXMuc2VjcmV0LmF1dGhBUEkuand0VG9rZW4sXG4gICAgICBvcHRpb25zIHx8IHtcbiAgICAgICAgZXhwaXJlc0luOiAzMDAsIC8vIDUgbWludXRlc1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgdG9rZW4gfTtcbiAgfVxuXG4gIGFzeW5jIHZlcmlmeSh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxqd3QuSnd0UGF5bG9hZCB8IHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIGp3dC52ZXJpZnkodG9rZW4sIHRoaXMuc2VjcmV0LmF1dGhBUEkuand0VG9rZW4sIChlcnJvciwgZGVjb2RlZCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgcmVqKG5ldyBBcGlFeGNlcHRpb24oZXJyb3IubWVzc2FnZSwgSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQsIGAke1Rva2VuU2VydmljZS5uYW1lfS8ke3RoaXMudmVyaWZ5Lm5hbWV9YCkpO1xuXG4gICAgICAgIHJlcyhkZWNvZGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZGVjb2RlKHRva2VuOiBzdHJpbmcpOiBqd3QuSnd0UGF5bG9hZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIGp3dC5kZWNvZGUodG9rZW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWRpc0NsaWVudFR5cGUgfSBmcm9tICdyZWRpcyc7XG5cbmltcG9ydCB7IENhY2hlS2V5QXJndW1lbnQsIENhY2hlS2V5VmFsdWUsIENhY2hlVmFsZXVBcmd1bWVudCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSUNhY2hlU2VydmljZTxUID0gUmVkaXNDbGllbnRUeXBlPiB7XG4gIGFic3RyYWN0IGNsaWVudDogVDtcbiAgYWJzdHJhY3QgaXNDb25uZWN0ZWQoKTogUHJvbWlzZTx2b2lkPjtcbiAgYWJzdHJhY3QgY29ubmVjdCgpOiBQcm9taXNlPFQ+O1xuICBhYnN0cmFjdCBzZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50LCB2YWx1ZTogQ2FjaGVWYWxldUFyZ3VtZW50LCBjb25maWc/OiB1bmtub3duKTogUHJvbWlzZTx2b2lkPjtcbiAgYWJzdHJhY3QgZGVsKGtleTogQ2FjaGVLZXlBcmd1bWVudCk6IFByb21pc2U8dm9pZD47XG4gIGFic3RyYWN0IGdldChrZXk6IENhY2hlS2V5QXJndW1lbnQpOiBQcm9taXNlPHVua25vd24+O1xuICBhYnN0cmFjdCBnZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50KTogUHJvbWlzZTx1bmtub3duPjtcbiAgYWJzdHJhY3Qgc2V0TXVsdGkocmVkaXNMaXN0OiBDYWNoZUtleVZhbHVlW10pOiBQcm9taXNlPHZvaWQ+O1xuICBhYnN0cmFjdCBwRXhwaXJlKGtleTogQ2FjaGVLZXlBcmd1bWVudCwgbWlsaXNlY29uZHM6IG51bWJlcik6IFByb21pc2U8dm9pZD47XG4gIGFic3RyYWN0IGhHZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50LCBmaWVsZDogQ2FjaGVLZXlBcmd1bWVudCk6IFByb21pc2U8dW5rbm93biB8IHVua25vd25bXT47XG4gIGFic3RyYWN0IGhTZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50LCBmaWVsZDogQ2FjaGVLZXlBcmd1bWVudCwgdmFsdWU6IENhY2hlVmFsZXVBcmd1bWVudCk6IFByb21pc2U8bnVtYmVyPjtcbiAgYWJzdHJhY3QgaEdldEFsbChrZXk6IENhY2hlS2V5QXJndW1lbnQpOiBQcm9taXNlPHVua25vd24gfCB1bmtub3duW10+O1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uL2dsb2JhbC9sb2dnZXIvYWRhcHRlcic7XG5pbXBvcnQgeyBJU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuLi9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IElDYWNoZVNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgUmVkaXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElDYWNoZVNlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiBhc3luYyAoeyBSRURJU19VUkwgfTogSVNlY3JldHNTZXJ2aWNlLCBsb2dnZXI6IElMb2dnZXJTZXJ2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhY2hlU2VydmljZSA9IG5ldyBSZWRpc1NlcnZpY2UoeyB1cmw6IFJFRElTX1VSTCB9LCBsb2dnZXIpO1xuICAgICAgICBhd2FpdCBjYWNoZVNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICByZXR1cm4gY2FjaGVTZXJ2aWNlO1xuICAgICAgfSxcbiAgICAgIGluamVjdDogW0lTZWNyZXRzU2VydmljZSwgSUxvZ2dlclNlcnZpY2VdLFxuICAgIH0sXG4gIF0sXG4gIGV4cG9ydHM6IFtJQ2FjaGVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVkaXNNb2R1bGUge31cbiIsImltcG9ydCB7IEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnbGlicy91dGlscy9leGNlcHRpb24nO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50LCBSZWRpc0NsaWVudE9wdGlvbnMsIFJlZGlzQ2xpZW50VHlwZSB9IGZyb20gJ3JlZGlzJztcblxuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUNhY2hlU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBDYWNoZUtleUFyZ3VtZW50LCBDYWNoZUtleVZhbHVlLCBDYWNoZVZhbGV1QXJndW1lbnQgfSBmcm9tICcuL3R5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlZGlzU2VydmljZSBpbXBsZW1lbnRzIElDYWNoZVNlcnZpY2Uge1xuICBjbGllbnQ6IFJlZGlzQ2xpZW50VHlwZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogUmVkaXNDbGllbnRPcHRpb25zLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyOiBJTG9nZ2VyU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjcmVhdGVDbGllbnQodGhpcy5jb25maWcpIGFzIFJlZGlzQ2xpZW50VHlwZTtcbiAgfVxuXG4gIGFzeW5jIGlzQ29ubmVjdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBpbmcgPSBhd2FpdCB0aGlzLmNsaWVudC5waW5nKCk7XG4gICAgaWYgKHBpbmcgIT09ICdQT05HJykgdGhpcy50aHJvd0V4Y2VwdGlvbigncmVkaXMgZGlzY29ubmVjdGVkLicpO1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPFJlZGlzQ2xpZW50VHlwZT4ge1xuICAgIGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcbiAgICB0aGlzLmxvZ2dlci5sb2coJ1JlZGlzIGNvbm5lY3RlZCFcXG4nKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQ7XG4gIH1cblxuICBhc3luYyBzZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50LCB2YWx1ZTogQ2FjaGVWYWxldUFyZ3VtZW50LCBjb25maWc/OiB1bmtub3duKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2V0UmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuc2V0KGtleSwgdmFsdWUsIGNvbmZpZyk7XG4gICAgaWYgKHNldFJlc3VsdCAhPT0gJ09LJykgdGhpcy50aHJvd0V4Y2VwdGlvbihgY2FjaGUgJHt0aGlzLnNldC5uYW1lfSBlcnJvcjogJHtrZXl9ICR7dmFsdWV9YCk7XG4gIH1cblxuICBhc3luYyBnZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50KTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgY29uc3QgZ2V0UmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuZ2V0KGtleSk7XG4gICAgaWYgKCFnZXRSZXN1bHQpIHRoaXMubG9nZ2VyLndhcm4oeyBtZXNzYWdlOiBga2V5OiAke2tleX0gbm90IGZvdW5kLmAsIGNvbnRleHQ6IFJlZGlzU2VydmljZS5uYW1lIH0pO1xuXG4gICAgcmV0dXJuIGdldFJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGRlbChrZXk6IENhY2hlS2V5QXJndW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkZWxldGVkID0gYXdhaXQgdGhpcy5jbGllbnQuZGVsKGtleSk7XG4gICAgaWYgKCFkZWxldGVkKSB0aGlzLnRocm93RXhjZXB0aW9uKGBjYWNoZSBrZXk6ICR7a2V5fSBub3QgZGVsZXRlZGApO1xuICB9XG5cbiAgYXN5bmMgc2V0TXVsdGkocmVkaXNMaXN0OiBDYWNoZUtleVZhbHVlW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtdWx0aSA9IHRoaXMuY2xpZW50Lm11bHRpKCk7XG5cbiAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIHJlZGlzTGlzdCkge1xuICAgICAgbXVsdGkuclB1c2gobW9kZWwua2V5LCBtb2RlbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgYXdhaXQgbXVsdGkuZXhlYygpO1xuICB9XG5cbiAgYXN5bmMgcEV4cGlyZShrZXk6IENhY2hlS2V5QXJndW1lbnQsIG1pbGlzZWNvbmRzOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleHBpcmVkID0gYXdhaXQgdGhpcy5jbGllbnQucEV4cGlyZShrZXksIG1pbGlzZWNvbmRzKTtcbiAgICBpZiAoIWV4cGlyZWQpIHRoaXMudGhyb3dFeGNlcHRpb24oYHNldCBleHBpcmUgZXJyb3Iga2V5OiAke2tleX1gKTtcbiAgfVxuXG4gIGFzeW5jIGhHZXQoa2V5OiBDYWNoZUtleUFyZ3VtZW50LCBmaWVsZDogQ2FjaGVLZXlBcmd1bWVudCk6IFByb21pc2U8dW5rbm93biB8IHVua25vd25bXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmNsaWVudC5oR2V0KGtleSwgZmllbGQpO1xuICB9XG5cbiAgYXN5bmMgaFNldChrZXk6IENhY2hlS2V5QXJndW1lbnQsIGZpZWxkOiBDYWNoZUtleUFyZ3VtZW50LCB2YWx1ZTogQ2FjaGVWYWxldUFyZ3VtZW50KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jbGllbnQuaFNldChrZXksIGZpZWxkLCB2YWx1ZSk7XG4gIH1cblxuICBhc3luYyBoR2V0QWxsKGtleTogQ2FjaGVLZXlBcmd1bWVudCk6IFByb21pc2U8dW5rbm93biB8IHVua25vd25bXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmNsaWVudC5oR2V0QWxsKGtleSk7XG4gIH1cblxuICBwcml2YXRlIHRocm93RXhjZXB0aW9uKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgQXBpRXhjZXB0aW9uKGVycm9yLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgUmVkaXNTZXJ2aWNlLm5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb25nb29zZU1vZHVsZU9wdGlvbnMgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IEZpbHRlclF1ZXJ5LCBRdWVyeU9wdGlvbnMsIFNhdmVPcHRpb25zLCBVcGRhdGVRdWVyeSwgVXBkYXRlV2l0aEFnZ3JlZ2F0aW9uUGlwZWxpbmUgfSBmcm9tICdtb25nb29zZSc7XG5cbmltcG9ydCB7IENvbm5lY3Rpb25Nb2RlbCwgQ3JlYXRlZE1vZGVsLCBSZW1vdmVkTW9kZWwsIFVwZGF0ZWRNb2RlbCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSURhdGFCYXNlU2VydmljZSB7XG4gIGFic3RyYWN0IGdldERlZmF1bHRDb25uZWN0aW9uPFQgPSBNb25nb29zZU1vZHVsZU9wdGlvbnM+KG9wdGlvbnM/OiBDb25uZWN0aW9uTW9kZWwpOiBUO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSVJlcG9zaXRvcnk8VD4ge1xuICBhYnN0cmFjdCBpc0Nvbm5lY3RlZCgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFic3RyYWN0IGNyZWF0ZTxUID0gU2F2ZU9wdGlvbnM+KGRvY3VtZW50OiBvYmplY3QsIHNhdmVPcHRpb25zPzogVCk6IFByb21pc2U8Q3JlYXRlZE1vZGVsPjtcblxuICBhYnN0cmFjdCBmaW5kQnlJZChpZDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxUPjtcblxuICBhYnN0cmFjdCBmaW5kQWxsKCk6IFByb21pc2U8VFtdPjtcblxuICBhYnN0cmFjdCBmaW5kPFRRdWVyeSA9IEZpbHRlclF1ZXJ5PFQ+LCBUT3B0aW9ucyA9IFF1ZXJ5T3B0aW9uczxUPj4oXG4gICAgZmlsdGVyOiBUUXVlcnksXG4gICAgb3B0aW9ucz86IFRPcHRpb25zIHwgbnVsbCxcbiAgKTogUHJvbWlzZTxUW10+O1xuXG4gIGFic3RyYWN0IHJlbW92ZTxUUXVlcnkgPSBGaWx0ZXJRdWVyeTxUPj4oZmlsdGVyOiBUUXVlcnkpOiBQcm9taXNlPFJlbW92ZWRNb2RlbD47XG5cbiAgYWJzdHJhY3QgZmluZE9uZTxUUXVlcnkgPSBGaWx0ZXJRdWVyeTxUPiwgVE9wdGlvbnMgPSBRdWVyeU9wdGlvbnM8VD4+KGZpbHRlcjogVFF1ZXJ5LCBvcHRpb25zPzogVE9wdGlvbnMpOiBQcm9taXNlPFQ+O1xuXG4gIGFic3RyYWN0IHVwZGF0ZU9uZTxcbiAgICBUUXVlcnkgPSBGaWx0ZXJRdWVyeTxUPixcbiAgICBUVXBkYXRlID0gVXBkYXRlUXVlcnk8VD4gfCBVcGRhdGVXaXRoQWdncmVnYXRpb25QaXBlbGluZSxcbiAgICBUT3B0aW9ucyA9IFF1ZXJ5T3B0aW9uczxUPixcbiAgPihmaWx0ZXI6IFRRdWVyeSwgdXBkYXRlZDogVFVwZGF0ZSwgb3B0aW9ucz86IFRPcHRpb25zKTogUHJvbWlzZTxVcGRhdGVkTW9kZWw+O1xuXG4gIGFic3RyYWN0IHVwZGF0ZU1hbnk8XG4gICAgVFF1ZXJ5ID0gRmlsdGVyUXVlcnk8VD4sXG4gICAgVFVwZGF0ZSA9IFVwZGF0ZVF1ZXJ5PFQ+IHwgVXBkYXRlV2l0aEFnZ3JlZ2F0aW9uUGlwZWxpbmUsXG4gICAgVE9wdGlvbnMgPSBRdWVyeU9wdGlvbnM8VD4sXG4gID4oZmlsdGVyOiBUUXVlcnksIHVwZGF0ZWQ6IFRVcGRhdGUsIG9wdGlvbnM/OiBUT3B0aW9ucyk6IFByb21pc2U8VXBkYXRlZE1vZGVsPjtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5cbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJy4uLy4uL2dsb2JhbC9zZWNyZXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgU2VjcmV0c01vZHVsZSB9IGZyb20gJy4uLy4uL2dsb2JhbC9zZWNyZXRzL21vZHVsZSc7XG5pbXBvcnQgeyBJRGF0YUJhc2VTZXJ2aWNlLCBJUmVwb3NpdG9yeSB9IGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IHsgQ29ubmVjdGlvbk5hbWUgfSBmcm9tICcuLi9lbnVtJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICcuLi9yZXBvc2l0b3J5JztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSURhdGFCYXNlU2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBEYXRhQmFzZVNlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBJUmVwb3NpdG9yeSxcbiAgICAgIHVzZUNsYXNzOiBSZXBvc2l0b3J5LFxuICAgIH0sXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBTZWNyZXRzTW9kdWxlLFxuICAgIE1vbmdvb3NlTW9kdWxlLmZvclJvb3RBc3luYyh7XG4gICAgICBjb25uZWN0aW9uTmFtZTogQ29ubmVjdGlvbk5hbWUuQVVUSCxcbiAgICAgIHVzZUZhY3Rvcnk6ICh7IGRhdGFiYXNlOiB7IGhvc3QsIHBvcnQsIHBhc3MsIHVzZXIgfSB9OiBJU2VjcmV0c1NlcnZpY2UpID0+XG4gICAgICAgIG5ldyBEYXRhQmFzZVNlcnZpY2UoKS5nZXREZWZhdWx0Q29ubmVjdGlvbih7IGRiTmFtZTogQ29ubmVjdGlvbk5hbWUuQVVUSCwgaG9zdCwgcGFzcywgcG9ydCwgdXNlciB9KSxcbiAgICAgIGluamVjdDogW0lTZWNyZXRzU2VydmljZV0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhEYXRhYmFzZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGUgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcblxuaW1wb3J0IHsgSVNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL3NlY3JldHMvYWRhcHRlcic7XG5pbXBvcnQgeyBTZWNyZXRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL3NlY3JldHMvbW9kdWxlJztcbmltcG9ydCB7IElEYXRhQmFzZVNlcnZpY2UsIElSZXBvc2l0b3J5IH0gZnJvbSAnLi4vYWRhcHRlcic7XG5pbXBvcnQgeyBDb25uZWN0aW9uTmFtZSB9IGZyb20gJy4uL2VudW0nO1xuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gJy4uL3JlcG9zaXRvcnknO1xuaW1wb3J0IHsgRGF0YUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBJRGF0YUJhc2VTZXJ2aWNlLFxuICAgICAgdXNlQ2xhc3M6IERhdGFCYXNlU2VydmljZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IElSZXBvc2l0b3J5LFxuICAgICAgdXNlQ2xhc3M6IFJlcG9zaXRvcnksXG4gICAgfSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIFNlY3JldHNNb2R1bGUsXG4gICAgTW9uZ29vc2VNb2R1bGUuZm9yUm9vdEFzeW5jKHtcbiAgICAgIGNvbm5lY3Rpb25OYW1lOiBDb25uZWN0aW9uTmFtZS5DQVRTLFxuICAgICAgdXNlRmFjdG9yeTogKHsgZGF0YWJhc2U6IHsgaG9zdCwgcG9ydCwgcGFzcywgdXNlciB9IH06IElTZWNyZXRzU2VydmljZSkgPT5cbiAgICAgICAgbmV3IERhdGFCYXNlU2VydmljZSgpLmdldERlZmF1bHRDb25uZWN0aW9uKHsgZGJOYW1lOiBDb25uZWN0aW9uTmFtZS5DQVRTLCBob3N0LCBwYXNzLCB1c2VyLCBwb3J0IH0pLFxuICAgICAgaW5qZWN0OiBbSVNlY3JldHNTZXJ2aWNlXSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2F0c0RhdGFiYXNlTW9kdWxlIHt9XG4iLCJleHBvcnQgZW51bSBDb25uZWN0aW9uTmFtZSB7XG4gIENBVFMgPSAnbW9ub3JlcG9fY2F0cycsXG4gIExPRyA9ICdtb25vcmVwb19sb2dzJyxcbiAgQVVUSCA9ICdtb25vcmVwb19hdXRoJyxcbn1cbiIsImltcG9ydCB7IEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tICdsaWJzL3V0aWxzJztcbmltcG9ydCBtb25nb2RiIGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHtcbiAgRmlsdGVyUXVlcnksXG4gIE1vZGVsLFxuICBNb25nb29zZVF1ZXJ5T3B0aW9ucyxcbiAgUXVlcnlPcHRpb25zLFxuICBTYXZlT3B0aW9ucyxcbiAgVXBkYXRlUXVlcnksXG4gIFVwZGF0ZVdpdGhBZ2dyZWdhdGlvblBpcGVsaW5lLFxufSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IHsgSVJlcG9zaXRvcnkgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgQ3JlYXRlZE1vZGVsLCBSZW1vdmVkTW9kZWwsIFVwZGF0ZWRNb2RlbCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUmVwb3NpdG9yeTxUIGV4dGVuZHMgRG9jdW1lbnQ+IGltcGxlbWVudHMgSVJlcG9zaXRvcnk8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG1vZGVsOiBNb2RlbDxUPikge31cblxuICBhc3luYyBpc0Nvbm5lY3RlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5tb2RlbC5kYi5yZWFkeVN0YXRlICE9PSAxKVxuICAgICAgdGhyb3cgbmV3IEFwaUV4Y2VwdGlvbihgZGIgJHt0aGlzLm1vZGVsLmRiLm5hbWV9IGRpc2Nvbm5lY3RlZGAsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCAnRGF0YWJhc2UnKTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShkb2N1bWVudDogb2JqZWN0LCBzYXZlT3B0aW9ucz86IFNhdmVPcHRpb25zKTogUHJvbWlzZTxDcmVhdGVkTW9kZWw+IHtcbiAgICBjb25zdCBjcmVhdGVkRW50aXR5ID0gbmV3IHRoaXMubW9kZWwoZG9jdW1lbnQpO1xuICAgIGNvbnN0IHNhdmVkUmVzdWx0ID0gYXdhaXQgY3JlYXRlZEVudGl0eS5zYXZlKHNhdmVPcHRpb25zKTtcblxuICAgIHJldHVybiB7IGlkOiBzYXZlZFJlc3VsdC5pZCwgY3JlYXRlZDogISFzYXZlZFJlc3VsdC5pZCB9O1xuICB9XG5cbiAgYXN5bmMgZmluZChmaWx0ZXI6IEZpbHRlclF1ZXJ5PFQ+LCBvcHRpb25zPzogUXVlcnlPcHRpb25zKTogUHJvbWlzZTxUW10+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tb2RlbC5maW5kKGZpbHRlciwgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIGZpbmRCeUlkKGlkOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tb2RlbC5maW5kQnlJZChpZCk7XG4gIH1cblxuICBhc3luYyBmaW5kT25lKGZpbHRlcjogRmlsdGVyUXVlcnk8VD4sIG9wdGlvbnM/OiBRdWVyeU9wdGlvbnMpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tb2RlbC5maW5kT25lKGZpbHRlciwgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIGZpbmRBbGwoKTogUHJvbWlzZTxUW10+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tb2RlbC5maW5kKCk7XG4gIH1cblxuICBhc3luYyByZW1vdmUoZmlsdGVyOiBGaWx0ZXJRdWVyeTxUPik6IFByb21pc2U8UmVtb3ZlZE1vZGVsPiB7XG4gICAgY29uc3QgeyBkZWxldGVkQ291bnQgfSA9IGF3YWl0IHRoaXMubW9kZWwuZGVsZXRlTWFueShmaWx0ZXIpO1xuICAgIHJldHVybiB7IGRlbGV0ZWRDb3VudCwgZGVsZXRlZDogISFkZWxldGVkQ291bnQgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZU9uZShcbiAgICBmaWx0ZXI6IEZpbHRlclF1ZXJ5PFQ+LFxuICAgIHVwZGF0ZWQ6IFVwZGF0ZVdpdGhBZ2dyZWdhdGlvblBpcGVsaW5lIHwgVXBkYXRlUXVlcnk8VD4sXG4gICAgb3B0aW9ucz86IChtb25nb2RiLlVwZGF0ZU9wdGlvbnMgJiBPbWl0PE1vbmdvb3NlUXVlcnlPcHRpb25zPFQ+LCAnbGVhbic+KSB8IG51bGwsXG4gICk6IFByb21pc2U8VXBkYXRlZE1vZGVsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwudXBkYXRlT25lKGZpbHRlciwgdXBkYXRlZCwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVNYW55KFxuICAgIGZpbHRlcjogRmlsdGVyUXVlcnk8VD4sXG4gICAgdXBkYXRlZDogVXBkYXRlV2l0aEFnZ3JlZ2F0aW9uUGlwZWxpbmUgfCBVcGRhdGVRdWVyeTxUPixcbiAgICBvcHRpb25zPzogKG1vbmdvZGIuVXBkYXRlT3B0aW9ucyAmIE9taXQ8TW9uZ29vc2VRdWVyeU9wdGlvbnM8VD4sICdsZWFuJz4pIHwgbnVsbCxcbiAgKTogUHJvbWlzZTxVcGRhdGVkTW9kZWw+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5tb2RlbC51cGRhdGVNYW55KGZpbHRlciwgdXBkYXRlZCwgb3B0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBNb25nb29zZU1vZHVsZU9wdGlvbnMgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcblxuaW1wb3J0IHsgSURhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IENvbm5lY3Rpb25Nb2RlbCB9IGZyb20gJy4vdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YUJhc2VTZXJ2aWNlIGltcGxlbWVudHMgSURhdGFCYXNlU2VydmljZSB7XG4gIGdldERlZmF1bHRDb25uZWN0aW9uPFQgZXh0ZW5kcyBNb25nb29zZU1vZHVsZU9wdGlvbnMgPSBNb25nb29zZU1vZHVsZU9wdGlvbnM+KGNvbmZpZzogQ29ubmVjdGlvbk1vZGVsKTogVCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFwcE5hbWU6ICdtb25vcmVwbycsXG4gICAgICB1cmk6IHRoaXMuZ2V0Q29ubmVjdGlvblN0cmluZyhjb25maWcpLFxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29ubmVjdGlvblN0cmluZyhjb25maWc6IENvbm5lY3Rpb25Nb2RlbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBtb25nb2RiOi8vJHtjb25maWcudXNlcn06JHtjb25maWcucGFzc31AJHtjb25maWcuaG9zdH06JHtjb25maWcucG9ydH0vJHtjb25maWcuZGJOYW1lfT9zZXJ2ZXJTZWxlY3Rpb25UaW1lb3V0TVM9NTAwMCZjb25uZWN0VGltZW91dE1TPTUwMDAmYXV0aFNvdXJjZT1hZG1pbiZhdXRoTWVjaGFuaXNtPVNDUkFNLVNIQS0yNTZgO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvbk1vZGVsID0ge1xuICBob3N0OiBzdHJpbmc7XG4gIHBvcnQ6IHN0cmluZyB8IG51bWJlcjtcbiAgdXNlcjogc3RyaW5nO1xuICBwYXNzOiBzdHJpbmc7XG4gIGRiTmFtZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVXBkYXRlZE1vZGVsID0ge1xuICBtYXRjaGVkQ291bnQ6IG51bWJlcjtcbiAgbW9kaWZpZWRDb3VudDogbnVtYmVyO1xuICBhY2tub3dsZWRnZWQ6IGJvb2xlYW47XG4gIHVwc2VydGVkSWQ6IHVua25vd24gfCBPYmplY3RJZDtcbiAgdXBzZXJ0ZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgUmVtb3ZlZE1vZGVsID0ge1xuICBkZWxldGVkQ291bnQ6IG51bWJlcjtcbiAgZGVsZXRlZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRNb2RlbCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgY3JlYXRlZDogYm9vbGVhbjtcbn07XG4iLCJpbXBvcnQgeyBMZXZlbFdpdGhTaWxlbnQgfSBmcm9tICdwaW5vJztcbmltcG9ydCB7IEh0dHBMb2dnZXIgfSBmcm9tICdwaW5vLWh0dHAnO1xuXG5pbXBvcnQgeyBFcnJvclR5cGUsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi90eXBlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElMb2dnZXJTZXJ2aWNlPFQgZXh0ZW5kcyBIdHRwTG9nZ2VyID0gSHR0cExvZ2dlcj4ge1xuICBhYnN0cmFjdCBwaW5vOiBUO1xuICBhYnN0cmFjdCBjb25uZWN0PFRMZXZlbCA9IExldmVsV2l0aFNpbGVudD4obG9nTGV2ZWw/OiBUTGV2ZWwpOiB2b2lkO1xuICBhYnN0cmFjdCBzZXRBcHBsaWNhdGlvbihhcHA6IHN0cmluZyk6IHZvaWQ7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUaGUgbWV0aG9kIHNob3VsZCBiZSB1c2Ugb25seSBpbiBtYWluLnRzLCB0aGlzIGxvZyB3b24ndCBiZSBzYXZlZCBpbiBlbGFzdGljLCBvbmx5IHNkb3V0XG4gICAqL1xuICBhYnN0cmFjdCBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcbiAgLyoqXG4gICAqIHRoaXMgbG9nIHdvbid0IGJlIHNhdmVkIGluIGVsYXN0aWMsIG9ubHkgc2RvdXRcbiAgICovXG4gIGFic3RyYWN0IHRyYWNlKHsgbWVzc2FnZSwgY29udGV4dCwgb2JqIH06IE1lc3NhZ2VUeXBlKTogdm9pZDtcbiAgYWJzdHJhY3QgaW5mbyh7IG1lc3NhZ2UsIGNvbnRleHQsIG9iaiB9OiBNZXNzYWdlVHlwZSk6IHZvaWQ7XG4gIGFic3RyYWN0IHdhcm4oeyBtZXNzYWdlLCBjb250ZXh0LCBvYmogfTogTWVzc2FnZVR5cGUpOiB2b2lkO1xuICBhYnN0cmFjdCBlcnJvcihlcnJvcjogRXJyb3JUeXBlLCBtZXNzYWdlPzogc3RyaW5nLCBjb250ZXh0Pzogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgZmF0YWwoZXJyb3I6IEVycm9yVHlwZSwgbWVzc2FnZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQ7XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJy4uL3NlY3JldHMvYWRhcHRlcic7XG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElMb2dnZXJTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogKHsgTE9HX0xFVkVMLCBFTEtfVVJMIH06IElTZWNyZXRzU2VydmljZSkgPT4ge1xuICAgICAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyU2VydmljZShFTEtfVVJMKTtcbiAgICAgICAgbG9nZ2VyLmNvbm5lY3QoTE9HX0xFVkVMKTtcbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICAgIH0sXG4gICAgICBpbmplY3Q6IFtJU2VjcmV0c1NlcnZpY2VdLFxuICAgIH0sXG4gIF0sXG4gIGV4cG9ydHM6IFtJTG9nZ2VyU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2dlck1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlLCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gJ25vZGU6aHR0cCc7XG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tICdub2RlOnN0cmVhbSc7XG5cbmltcG9ydCB7IEluamVjdGFibGUsIEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24sIFNjb3BlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgZ3JheSwgZ3JlZW4sIGlzQ29sb3JTdXBwb3J0ZWQsIHJlZCwgeWVsbG93IH0gZnJvbSAnY29sb3JldHRlJztcbmltcG9ydCB7IFBpbm9SZXF1ZXN0Q29udmVydGVyIH0gZnJvbSAnY29udmVydC1waW5vLXJlcXVlc3QtdG8tY3VybCc7XG5pbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tICdsaWJzL3V0aWxzJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgTGV2ZWxXaXRoU2lsZW50LCBMb2dnZXIsIG11bHRpc3RyZWFtLCBwaW5vIH0gZnJvbSAncGlubyc7XG4vLyBpbXBvcnQgcGlub0VsYXN0aWMgZnJvbSAncGluby1lbGFzdGljc2VhcmNoJztcbmltcG9ydCB7IEh0dHBMb2dnZXIsIE9wdGlvbnMsIHBpbm9IdHRwIH0gZnJvbSAncGluby1odHRwJztcbmltcG9ydCBwaW5vUHJldHR5IGZyb20gJ3Bpbm8tcHJldHR5JztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBFcnJvclR5cGUsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi90eXBlJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsdW5pY29ybi9wcmVmZXItbW9kdWxlXG5jb25zdCBwaW5vRWxhc3RpYyA9IHJlcXVpcmUoJ3Bpbm8tZWxhc3RpY3NlYXJjaCcpO1xuXG5ASW5qZWN0YWJsZSh7IHNjb3BlOiBTY29wZS5SRVFVRVNUIH0pXG5leHBvcnQgY2xhc3MgTG9nZ2VyU2VydmljZSBpbXBsZW1lbnRzIElMb2dnZXJTZXJ2aWNlIHtcbiAgcGlubzogSHR0cExvZ2dlcjtcbiAgcHJpdmF0ZSBhcHA6IHN0cmluZztcbiAgcHJpdmF0ZSBzdHJlYW1Ub0VsYXN0aWM6IFRyYW5zZm9ybTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsa1VybDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSBgbW9ub3JlcG8tbG9ncy0ke3RoaXMuZ2V0RGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAneXl5eS1NTScpfWA7XG5cbiAgICB0aGlzLnN0cmVhbVRvRWxhc3RpYyA9IHBpbm9FbGFzdGljKHtcbiAgICAgIGluZGV4LFxuICAgICAgbm9kZTogdGhpcy5lbGtVcmwsXG4gICAgICBlc1ZlcnNpb246IDcsXG4gICAgICBmbHVzaEJ5dGVzOiAxMDAwLFxuICAgIH0pO1xuICB9XG5cbiAgY29ubmVjdDxUID0gTGV2ZWxXaXRoU2lsZW50Pihsb2dMZXZlbDogVCk6IHZvaWQge1xuICAgIGNvbnN0IHBpbm9Mb2dnZXIgPSBwaW5vKFxuICAgICAge1xuICAgICAgICAvLyB1c2VMZXZlbExhYmVsczogdHJ1ZSxcbiAgICAgICAgbGV2ZWw6IFtsb2dMZXZlbCwgJ3RyYWNlJ10uZmluZChCb29sZWFuKS50b1N0cmluZygpLFxuICAgICAgfSxcbiAgICAgIG11bHRpc3RyZWFtKFtcbiAgICAgICAge1xuICAgICAgICAgIGxldmVsOiAndHJhY2UnLFxuICAgICAgICAgIHN0cmVhbTogcGlub1ByZXR0eSh0aGlzLmdldFBpbm9Db25maWcoKSksXG4gICAgICAgIH0sXG4gICAgICAgIHsgbGV2ZWw6ICdpbmZvJywgc3RyZWFtOiB0aGlzLnN0cmVhbVRvRWxhc3RpYyB9LFxuICAgICAgXSksXG4gICAgKTtcblxuICAgIHRoaXMucGlubyA9IHBpbm9IdHRwKHRoaXMuZ2V0UGlub0h0dHBDb25maWcocGlub0xvZ2dlcikpO1xuICB9XG5cbiAgc2V0QXBwbGljYXRpb24oYXBwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfVxuXG4gIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBpbm8ubG9nZ2VyLnRyYWNlKGdyZWVuKG1lc3NhZ2UpKTtcbiAgfVxuXG4gIHRyYWNlKHsgbWVzc2FnZSwgY29udGV4dCwgb2JqID0ge30gfTogTWVzc2FnZVR5cGUpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKG9iaiwgeyBjb250ZXh0IH0pO1xuICAgIHRoaXMucGluby5sb2dnZXIudHJhY2UoW29iaiwgZ3JheShtZXNzYWdlKV0uZmluZChCb29sZWFuKSwgZ3JheShtZXNzYWdlKSk7XG4gIH1cblxuICBpbmZvKHsgbWVzc2FnZSwgY29udGV4dCwgb2JqID0ge30gfTogTWVzc2FnZVR5cGUpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKG9iaiwgeyBjb250ZXh0IH0pO1xuICAgIHRoaXMucGluby5sb2dnZXIuaW5mbyhbb2JqLCBncmVlbihtZXNzYWdlKV0uZmluZChCb29sZWFuKSwgZ3JlZW4obWVzc2FnZSkpO1xuICB9XG5cbiAgd2Fybih7IG1lc3NhZ2UsIGNvbnRleHQsIG9iaiA9IHt9IH06IE1lc3NhZ2VUeXBlKTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbihvYmosIHsgY29udGV4dCB9KTtcbiAgICB0aGlzLnBpbm8ubG9nZ2VyLndhcm4oW29iaiwgeWVsbG93KG1lc3NhZ2UpXS5maW5kKEJvb2xlYW4pLCB5ZWxsb3cobWVzc2FnZSkpO1xuICB9XG5cbiAgZXJyb3IoZXJyb3I6IEVycm9yVHlwZSwgbWVzc2FnZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB0aGlzLmdldEVycm9yUmVzcG9uc2UoZXJyb3IpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPVxuICAgICAgZXJyb3I/Lm5hbWUgPT09IEFwaUV4Y2VwdGlvbi5uYW1lXG4gICAgICAgID8geyBzdGF0dXNDb2RlOiBlcnJvclsnc3RhdHVzQ29kZSddLCBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB9XG4gICAgICAgIDogZXJyb3JSZXNwb25zZT8udmFsdWUoKTtcblxuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBFcnJvcjogQXBpRXhjZXB0aW9uLm5hbWUsXG4gICAgfVtlcnJvcj8ubmFtZV07XG5cbiAgICB0aGlzLnBpbm8ubG9nZ2VyLmVycm9yKFxuICAgICAge1xuICAgICAgICAuLi5yZXNwb25zZSxcbiAgICAgICAgY29udGV4dDogW2NvbnRleHQsIHRoaXMuYXBwXS5maW5kKEJvb2xlYW4pLFxuICAgICAgICB0eXBlOiBbdHlwZSwgZXJyb3I/Lm5hbWVdLmZpbmQoQm9vbGVhbiksXG4gICAgICAgIHRyYWNlaWQ6IHRoaXMuZ2V0VHJhY2VJZChlcnJvciksXG4gICAgICAgIHRpbWVzdGFtcDogdGhpcy5nZXREYXRlRm9ybWF0KCksXG4gICAgICAgIGFwcGxpY2F0aW9uOiB0aGlzLmFwcCxcbiAgICAgICAgc3RhY2s6IGVycm9yLnN0YWNrLFxuICAgICAgfSxcbiAgICAgIHJlZChtZXNzYWdlKSxcbiAgICApO1xuICB9XG5cbiAgZmF0YWwoZXJyb3I6IEVycm9yVHlwZSwgbWVzc2FnZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGluby5sb2dnZXIuZmF0YWwoXG4gICAgICB7XG4gICAgICAgIC4uLihlcnJvci5nZXRSZXNwb25zZSgpIGFzIG9iamVjdCksXG4gICAgICAgIGNvbnRleHQ6IFtjb250ZXh0LCB0aGlzLmFwcF0uZmluZChCb29sZWFuKSxcbiAgICAgICAgdHlwZTogZXJyb3IubmFtZSxcbiAgICAgICAgdHJhY2VpZDogdGhpcy5nZXRUcmFjZUlkKGVycm9yKSxcbiAgICAgICAgdGltZXN0YW1wOiB0aGlzLmdldERhdGVGb3JtYXQoKSxcbiAgICAgICAgYXBwbGljYXRpb246IHRoaXMuYXBwLFxuICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2ssXG4gICAgICB9LFxuICAgICAgcmVkKG1lc3NhZ2UpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFBpbm9Db25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yaXplOiBpc0NvbG9yU3VwcG9ydGVkLFxuICAgICAgbGV2ZWxGaXJzdDogdHJ1ZSxcbiAgICAgIGlnbm9yZTogJ3BpZCxob3N0bmFtZScsXG4gICAgICBxdWlldFJlcUxvZ2dlcjogdHJ1ZSxcbiAgICAgIG1lc3NhZ2VGb3JtYXQ6IChsb2c6IHVua25vd24sIG1lc3NhZ2VLZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbG9nW1N0cmluZyhtZXNzYWdlS2V5KV07XG4gICAgICAgIGlmICh0aGlzLmFwcCkge1xuICAgICAgICAgIHJldHVybiBgWyR7dGhpcy5hcHB9XSAke21lc3NhZ2V9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfSxcbiAgICAgIGN1c3RvbVByZXR0aWZpZXJzOiB7XG4gICAgICAgIHRpbWU6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFske3RoaXMuZ2V0RGF0ZUZvcm1hdCgpfV1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQaW5vSHR0cENvbmZpZyhwaW5vTG9nZ2VyOiBMb2dnZXIpOiBPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9nZ2VyOiBwaW5vTG9nZ2VyLFxuICAgICAgcXVpZXRSZXFMb2dnZXI6IHRydWUsXG4gICAgICBjdXN0b21TdWNjZXNzTWVzc2FnZTogKHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiBgcmVxdWVzdCAke3Jlcy5zdGF0dXNDb2RlID49IDQwMCA/IHJlZCgnZXJycm8nKSA6IGdyZWVuKCdzdWNjZXNzJyl9IHdpdGggc3RhdHVzIGNvZGU6ICR7cmVzLnN0YXR1c0NvZGV9YDtcbiAgICAgIH0sXG4gICAgICBjdXN0b21FcnJvck1lc3NhZ2U6IChyZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSwgZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgIHJldHVybiBgcmVxdWVzdCAke3JlZChlcnJvci5uYW1lKX0gd2l0aCBzdGF0dXMgY29kZTogJHtyZXMuc3RhdHVzQ29kZX0gYDtcbiAgICAgIH0sXG4gICAgICBnZW5SZXFJZDogKHJlcTogSW5jb21pbmdNZXNzYWdlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXEuaGVhZGVycy50cmFjZWlkO1xuICAgICAgfSxcbiAgICAgIGN1c3RvbUF0dHJpYnV0ZUtleXM6IHtcbiAgICAgICAgcmVxOiAncmVxdWVzdCcsXG4gICAgICAgIHJlczogJ3Jlc3BvbnNlJyxcbiAgICAgICAgZXJyOiAnZXJyb3InLFxuICAgICAgICByZXNwb25zZVRpbWU6ICd0aW1lVGFrZW4nLFxuICAgICAgICByZXFJZDogJ3RyYWNlaWQnLFxuICAgICAgfSxcbiAgICAgIHNlcmlhbGl6ZXJzOiB7XG4gICAgICAgIGVycjogKCkgPT4gZmFsc2UsXG4gICAgICAgIHJlcTogKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgICAgIGN1cmw6IFBpbm9SZXF1ZXN0Q29udmVydGVyLmdldEN1cmwocmVxdWVzdCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzOiBwaW5vLnN0ZFNlcmlhbGl6ZXJzLnJlcyxcbiAgICAgIH0sXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY3VzdG9tUHJvcHM6IChyZXE6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSByZXEuY29udGV4dDtcblxuICAgICAgICBjb25zdCB0cmFjZWlkID0gW3JlcT8uaGVhZGVycz8udHJhY2VpZCwgcmVxLmlkXS5maW5kKEJvb2xlYW4pO1xuXG4gICAgICAgIGNvbnN0IHBhdGggPSBgJHtyZXEucHJvdG9jb2x9Oi8vJHtyZXEuaGVhZGVycy5ob3N0fSR7cmVxLnVybH1gO1xuXG4gICAgICAgIHRoaXMucGluby5sb2dnZXIuc2V0QmluZGluZ3Moe1xuICAgICAgICAgIHRyYWNlaWQsXG4gICAgICAgICAgYXBwbGljYXRpb246IHRoaXMuYXBwLFxuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICB0aW1lc3RhbXA6IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYWNlaWQsXG4gICAgICAgICAgYXBwbGljYXRpb246IHRoaXMuYXBwLFxuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICB0aW1lc3RhbXA6IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGN1c3RvbUxvZ0xldmVsOiAocmVxOiBJbmNvbWluZ01lc3NhZ2UsIHJlczogU2VydmVyUmVzcG9uc2UsIGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBpZiAoW3Jlcy5zdGF0dXNDb2RlID49IDQwMCwgZXJyb3JdLnNvbWUoQm9vbGVhbikpIHtcbiAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChbcmVzLnN0YXR1c0NvZGUgPj0gMzAwLCByZXMuc3RhdHVzQ29kZSA8PSA0MDBdLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgcmV0dXJuICdzaWxlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdpbmZvJztcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHByaXZhdGUgZ2V0RXJyb3JSZXNwb25zZShlcnJvcjogRXJyb3JUeXBlKTogYW55IHtcbiAgICBjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGVycm9yPy5nZXRSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBjb25kaXRpb25hbDogdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyxcbiAgICAgICAgdmFsdWU6ICgpID0+IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKGVycm9yKS5nZXRSZXNwb25zZSgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uZGl0aW9uYWw6IGlzRnVuY3Rpb24gJiYgdHlwZW9mIGVycm9yLmdldFJlc3BvbnNlKCkgPT09ICdzdHJpbmcnLFxuICAgICAgICB2YWx1ZTogKCkgPT5cbiAgICAgICAgICBuZXcgQXBpRXhjZXB0aW9uKFxuICAgICAgICAgICAgZXJyb3IuZ2V0UmVzcG9uc2UoKSxcbiAgICAgICAgICAgIFtlcnJvci5nZXRTdGF0dXMoKSwgZXJyb3JbJ3N0YXR1cyddXS5maW5kKEJvb2xlYW4pLFxuICAgICAgICAgICAgZXJyb3JbJ2NvbnRleHQnXSxcbiAgICAgICAgICApLmdldFJlc3BvbnNlKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25kaXRpb25hbDogaXNGdW5jdGlvbiAmJiB0eXBlb2YgZXJyb3IuZ2V0UmVzcG9uc2UoKSA9PT0gJ29iamVjdCcsXG4gICAgICAgIHZhbHVlOiAoKSA9PiBlcnJvcj8uZ2V0UmVzcG9uc2UoKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmRpdGlvbmFsOiBbZXJyb3I/Lm5hbWUgPT09IEVycm9yLm5hbWUsIGVycm9yPy5uYW1lID09IFR5cGVFcnJvci5uYW1lXS5zb21lKEJvb2xlYW4pLFxuICAgICAgICB2YWx1ZTogKCkgPT4gbmV3IEludGVybmFsU2VydmVyRXJyb3JFeGNlcHRpb24oZXJyb3IubWVzc2FnZSkuZ2V0UmVzcG9uc2UoKSxcbiAgICAgIH0sXG4gICAgXS5maW5kKChjKSA9PiBjLmNvbmRpdGlvbmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZUZvcm1hdChkYXRlID0gbmV3IERhdGUoKSwgZm9ybWF0ID0gJ2RkL01NL3l5eXkgSEg6bW06c3MnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbUpTRGF0ZShkYXRlKS5zZXRab25lKHByb2Nlc3MuZW52LlRaKS50b0Zvcm1hdChmb3JtYXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFjZUlkKGVycm9yKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykgcmV0dXJuIHV1aWR2NCgpO1xuICAgIHJldHVybiBbZXJyb3IudHJhY2VpZCwgdGhpcy5waW5vLmxvZ2dlci5iaW5kaW5ncygpPy50cmFuY2VJZF0uZmluZChCb29sZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR2xvYmFsLCBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IExvZ2dlck1vZHVsZSB9IGZyb20gJy4vbG9nZ2VyL21vZHVsZSc7XG5pbXBvcnQgeyBTZWNyZXRzTW9kdWxlIH0gZnJvbSAnLi9zZWNyZXRzL21vZHVsZSc7XG5cbkBHbG9iYWwoKVxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtMb2dnZXJNb2R1bGUsIFNlY3JldHNNb2R1bGVdLFxuICBleHBvcnRzOiBbTG9nZ2VyTW9kdWxlLCBTZWNyZXRzTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgR2xvYmFsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBBdXRoQVBJRW52aXJvbm1lbnQsIENhdHNBUElFbnZpcm9ubWVudCB9IGZyb20gJy4vZW51bSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJU2VjcmV0c1NlcnZpY2Uge1xuICBFTlY6IHN0cmluZztcbiAgUkVESVNfVVJMOiBzdHJpbmc7XG5cbiAgRUxLX1VSTDogc3RyaW5nO1xuXG4gIE1PTkdPX0VYUFJFU1NfVVJMOiBzdHJpbmc7XG4gIEpFQUdFUl9VUkw6IHN0cmluZztcbiAgUkVESVNfQ09NTUFOREVSX1VSTDogc3RyaW5nO1xuICBLSUJBTkFfVVJMOiBzdHJpbmc7XG5cbiAgTE9HX0xFVkVMOiBzdHJpbmc7XG5cbiAgZGF0YWJhc2U6IHtcbiAgICBob3N0OiBzdHJpbmc7XG4gICAgcG9ydDogbnVtYmVyO1xuICAgIHVzZXI6IHN0cmluZztcbiAgICBwYXNzOiBzdHJpbmc7XG4gIH07XG5cbiAgbWFpbkFQSToge1xuICAgIHBvcnQ6IENhdHNBUElFbnZpcm9ubWVudCB8IG51bWJlcjtcbiAgICB1cmw6IENhdHNBUElFbnZpcm9ubWVudCB8IHN0cmluZztcbiAgfTtcblxuICBhdXRoQVBJOiB7XG4gICAgcG9ydDogQXV0aEFQSUVudmlyb25tZW50IHwgbnVtYmVyO1xuICAgIGp3dFRva2VuOiBBdXRoQVBJRW52aXJvbm1lbnQgfCBzdHJpbmc7XG4gICAgdXJsOiBBdXRoQVBJRW52aXJvbm1lbnQgfCBzdHJpbmc7XG4gIH07XG5cbiAgR0lUSFVCX1NDUkFQX0FQSTogc3RyaW5nO1xufVxuIiwiZXhwb3J0IGVudW0gQ2F0c0FQSUVudmlyb25tZW50IHtcbiAgUE9SVCA9ICdQT1JUX0NBVFNfQVBJJyxcbiAgVVJMID0gJ0NBVFNfQVBJX1VSTCcsXG59XG5cbmV4cG9ydCBlbnVtIEF1dGhBUElFbnZpcm9ubWVudCB7XG4gIFBPUlQgPSAnUE9SVF9BVVRIX0FQSScsXG4gIFNFQ1JFVF9KV1QgPSAnU0VDUkVUX0pXVCcsXG4gIFVSTCA9ICdBVVRIX0FQSV9VUkwnLFxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuXG5pbXBvcnQgeyBJU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbmZpZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIGVudkZpbGVQYXRoOiBbJy5lbnYnXSxcbiAgICB9KSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSVNlY3JldHNTZXJ2aWNlLFxuICAgICAgdXNlQ2xhc3M6IFNlY3JldHNTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG4gIGV4cG9ydHM6IFtJU2VjcmV0c1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWNyZXRzTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcbmltcG9ydCB7IExldmVsV2l0aFNpbGVudCB9IGZyb20gJ3Bpbm8nO1xuXG5pbXBvcnQgeyBJU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgQXV0aEFQSUVudmlyb25tZW50LCBDYXRzQVBJRW52aXJvbm1lbnQgfSBmcm9tICcuL2VudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VjcmV0c1NlcnZpY2UgZXh0ZW5kcyBDb25maWdTZXJ2aWNlIGltcGxlbWVudHMgSVNlY3JldHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIEVMS19VUkwgPSB0aGlzLmdldCgnRUxLX1VSTCcpO1xuXG4gIE1PTkdPX0VYUFJFU1NfVVJMID0gdGhpcy5nZXQoJ01PTkdPX0VYUFJFU1NfVVJMJyk7XG4gIFJFRElTX0NPTU1BTkRFUl9VUkwgPSB0aGlzLmdldCgnUkVESVNfQ09NTUFOREVSX1VSTCcpO1xuICBKRUFHRVJfVVJMID0gdGhpcy5nZXQoJ0pFQUdFUl9VUkwnKTtcbiAgS0lCQU5BX1VSTCA9IHRoaXMuZ2V0KCdLSUJBTkFfVVJMJyk7XG5cbiAgUkVESVNfVVJMID0gdGhpcy5nZXQoJ1JFRElTX1VSTCcpO1xuXG4gIEVOViA9IHRoaXMuZ2V0KCdFTlYnKTtcblxuICBMT0dfTEVWRUwgPSB0aGlzLmdldDxMZXZlbFdpdGhTaWxlbnQ+KCdMT0dfTEVWRUwnKTtcblxuICBkYXRhYmFzZSA9IHtcbiAgICBob3N0OiB0aGlzLmdldCgnTU9OR09fSE9TVCcpLFxuICAgIHBvcnQ6IHRoaXMuZ2V0PG51bWJlcj4oJ01PTkdPX1BPUlQnKSxcbiAgICB1c2VyOiB0aGlzLmdldCgnTU9OR09fSU5JVERCX1JPT1RfVVNFUk5BTUUnKSxcbiAgICBwYXNzOiB0aGlzLmdldCgnTU9OR09fSU5JVERCX1JPT1RfUEFTU1dPUkQnKSxcbiAgfTtcblxuICBtYWluQVBJID0ge1xuICAgIHBvcnQ6IHRoaXMuZ2V0PG51bWJlcj4oQ2F0c0FQSUVudmlyb25tZW50LlBPUlQpLFxuICAgIHVybDogdGhpcy5nZXQoQ2F0c0FQSUVudmlyb25tZW50LlVSTCksXG4gIH07XG5cbiAgYXV0aEFQSSA9IHtcbiAgICBwb3J0OiB0aGlzLmdldDxudW1iZXI+KEF1dGhBUElFbnZpcm9ubWVudC5QT1JUKSxcbiAgICBqd3RUb2tlbjogdGhpcy5nZXQoQXV0aEFQSUVudmlyb25tZW50LlNFQ1JFVF9KV1QpLFxuICAgIHVybDogdGhpcy5nZXQoQXV0aEFQSUVudmlyb25tZW50LlVSTCksXG4gIH07XG5cbiAgR0lUSFVCX1NDUkFQX0FQSSA9IHRoaXMuZ2V0KCdHSVRIVUJfU0NSQVBfQVBJJyk7XG59XG4iLCJpbXBvcnQgeyBBeGlvcywgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSUh0dHBTZXJ2aWNlPFQgPSBBeGlvcz4ge1xuICBhYnN0cmFjdCBpbnN0YW5jZTxUQ29uZmlnID0gQXhpb3NSZXF1ZXN0Q29uZmlnPihjb25maWc/OiBUQ29uZmlnKTogVDtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgSUh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElIdHRwU2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBIdHRwU2VydmljZSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbSUh0dHBTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgSHR0cE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCBheGlvcywgeyBBeGlvcywgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuXG5pbXBvcnQgeyBJSHR0cFNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cFNlcnZpY2UgaW1wbGVtZW50cyBJSHR0cFNlcnZpY2Uge1xuICBpbnN0YW5jZShjb25maWc/OiBBeGlvc1JlcXVlc3RDb25maWcpOiBBeGlvcyB7XG4gICAgcmV0dXJuIGF4aW9zLmNyZWF0ZShbY29uZmlnLCB7IHRpbWVvdXQ6IDUwMDAgfV0uZmluZChCb29sZWFuKSk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZGF0YWJhc2UvL3JlcG9zaXRvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhYmFzZS9hZGFwdGVyJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YWJhc2UvY29ubmVjdGlvbi9hdXRoJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YWJhc2UvY29ubmVjdGlvbi9jYXRzJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YWJhc2UvdHlwZXMnO1xuLy8gTmVlZWVlZWV2ZXIgc2VydmljZXMgaGVyZVxuIiwiZXhwb3J0IGNvbnN0IFNXQUdHRVJfQVBJX1JPT1QgPSAnZG9jcyc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9UQUcgPSAnU3dhZ2dlciBEb2N1bWVudGF0aW9uJztcbiIsImltcG9ydCB7IEFwaVJlc3BvbnNlT3B0aW9ucyB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5cbmltcG9ydCB7IEVycm9yTW9kZWwgfSBmcm9tICcuLi9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgaHR0dHBTdGF0dXMgZnJvbSAnLi4vc3RhdGljL2h0dHRwLXN0YXR1cy5qc29uJztcblxudHlwZSBTd2FnZ2VyRXJyb3IgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICByb3V0ZTogc3RyaW5nO1xuICBtZXNzYWdlPzogc3RyaW5nIHwgdW5rbm93bjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIFN3YWdnZXJUZXh0ID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nIHwgdW5rbm93bjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIFN3YWdnZXJKU09OID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAganNvbjogdW5rbm93bjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgU3dhZ2dlciA9IHtcbiAgZGVmYXVsdFJlc3BvbnNlRXJyb3IoeyBzdGF0dXMsIHJvdXRlLCBtZXNzYWdlLCBkZXNjcmlwdGlvbiB9OiBTd2FnZ2VyRXJyb3IpOiBBcGlSZXNwb25zZU9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBzY2hlbWE6IHtcbiAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBjb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICB0cmFjZWlkOiAnPHRyYWNlaWQ+JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFttZXNzYWdlLCBodHR0cFN0YXR1c1tTdHJpbmcoc3RhdHVzKV1dLmZpbmQoQm9vbGVhbiksXG4gICAgICAgICAgICB0aW1lc3RhbXA6ICc8dGltZXN0YW1wPicsXG4gICAgICAgICAgICBwYXRoOiByb3V0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9IGFzIEVycm9yTW9kZWwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXMsXG4gICAgfTtcbiAgfSxcblxuICBkZWZhdWx0UmVzcG9uc2VUZXh0KHsgc3RhdHVzLCB0ZXh0LCBkZXNjcmlwdGlvbiB9OiBTd2FnZ2VyVGV4dCk6IEFwaVJlc3BvbnNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgJ3RleHQvcGxhaW4nOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICBleGFtcGxlOiB0ZXh0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXMsXG4gICAgfTtcbiAgfSxcblxuICBkZWZhdWx0UmVzcG9uc2VKU09OKHsgc3RhdHVzLCBqc29uLCBkZXNjcmlwdGlvbiB9OiBTd2FnZ2VySlNPTik6IEFwaVJlc3BvbnNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICBleGFtcGxlOiBqc29uLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzdGF0dXMsXG4gICAgfTtcbiAgfSxcblxuICBkZWZhdWx0UmVxdWVzdEpTT04oanNvbjogdW5rbm93bik6IEFwaVJlc3BvbnNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjaGVtYToge1xuICAgICAgICBleGFtcGxlOiBqc29uLFxuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcbiIsImltcG9ydCB7IEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIEVycm9yTW9kZWwgPSB7XG4gIGVycm9yOiB7XG4gICAgY29kZTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIHRyYWNlaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XG4gICAgcGF0aDogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIEFwaUV4Y2VwdGlvbiBleHRlbmRzIEh0dHBFeGNlcHRpb24ge1xuICBjb250ZXh0OiBzdHJpbmc7XG4gIHRyYWNlaWQ6IHN0cmluZztcbiAgc3RhdHVzQ29kZTogbnVtYmVyO1xuICBjb2RlPzogc3RyaW5nO1xuICBjb25maWc/OiB1bmtub3duO1xuICB1c2VyPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVycm9yOiBzdHJpbmcgfCBvYmplY3QsXG4gICAgc3RhdHVzPzogSHR0cFN0YXR1cyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGN0eD86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZXJyb3IsIFtzdGF0dXMsIDUwMF0uZmluZChCb29sZWFuKSk7XG4gICAgdGhpcy5zdGF0dXNDb2RlID0gc3VwZXIuZ2V0U3RhdHVzKCk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjdHg7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBcmd1bWVudHNIb3N0LCBDYXRjaCwgRXhjZXB0aW9uRmlsdGVyLCBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5pbXBvcnQgeyBBcGlFeGNlcHRpb24sIEVycm9yTW9kZWwgfSBmcm9tICcuLi9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgZXJyb3JTdGF0dXMgZnJvbSAnLi4vc3RhdGljL2h0dHRwLXN0YXR1cy5qc29uJztcblxuQENhdGNoKClcbmV4cG9ydCBjbGFzcyBBcHBFeGNlcHRpb25GaWx0ZXIgaW1wbGVtZW50cyBFeGNlcHRpb25GaWx0ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxvZ2dlclNlcnZpY2U6IElMb2dnZXJTZXJ2aWNlKSB7fVxuXG4gIGNhdGNoKGV4Y2VwdGlvbjogQXBpRXhjZXB0aW9uLCBob3N0OiBBcmd1bWVudHNIb3N0KTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IGhvc3Quc3dpdGNoVG9IdHRwKCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBjb250ZXh0LmdldFJlc3BvbnNlKCk7XG4gICAgY29uc3QgcmVxdWVzdCA9IGNvbnRleHQuZ2V0UmVxdWVzdDxSZXF1ZXN0PigpO1xuXG4gICAgY29uc3Qgc3RhdHVzID1cbiAgICAgIGV4Y2VwdGlvbiBpbnN0YW5jZW9mIEh0dHBFeGNlcHRpb25cbiAgICAgICAgPyBleGNlcHRpb24uZ2V0U3RhdHVzKClcbiAgICAgICAgOiBbZXhjZXB0aW9uWydzdGF0dXMnXSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1JdLmZpbmQoQm9vbGVhbik7XG5cbiAgICBleGNlcHRpb24udHJhY2VpZCA9IFtleGNlcHRpb24udHJhY2VpZCwgcmVxdWVzdFsnaWQnXV0uZmluZChCb29sZWFuKTtcblxuICAgIHRoaXMubG9nZ2VyU2VydmljZS5lcnJvcihleGNlcHRpb24sIGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24uY29udGV4dCk7XG5cbiAgICByZXNwb25zZS5zdGF0dXMoc3RhdHVzKS5qc29uKHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGNvZGU6IHN0YXR1cyxcbiAgICAgICAgdHJhY2VpZDogZXhjZXB0aW9uLnRyYWNlaWQsXG4gICAgICAgIG1lc3NhZ2U6IFtlcnJvclN0YXR1c1tTdHJpbmcoc3RhdHVzKV0sIGV4Y2VwdGlvbi5tZXNzYWdlXS5maW5kKEJvb2xlYW4pLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGVUaW1lLmZyb21KU0RhdGUobmV3IERhdGUoKSkuc2V0Wm9uZShwcm9jZXNzLmVudi5UWikudG9Gb3JtYXQoJ2RkL01NL3l5eXkgSEg6bW06c3MnKSxcbiAgICAgICAgcGF0aDogcmVxdWVzdC51cmwsXG4gICAgICB9LFxuICAgIH0gYXMgRXJyb3JNb2RlbCk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vcmVxdWVzdCc7XG4iLCJpbXBvcnQgeyBDYWxsSGFuZGxlciwgRXhlY3V0aW9uQ29udGV4dCwgSHR0cFN0YXR1cywgSW5qZWN0YWJsZSwgTmVzdEludGVyY2VwdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBpUmVxdWVzdCB9IGZyb20gJ2xpYnMvdXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBpbnRlcmNlcHQoZXhlY3V0aW9uQ29udGV4dDogRXhlY3V0aW9uQ29udGV4dCwgbmV4dDogQ2FsbEhhbmRsZXIpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgZXJyb3Iuc3RhdHVzID0gW2Vycm9yLnN0YXR1cywgZXJyb3I/LnJlc3BvbnNlPy5zdGF0dXMsIDUwMF0uZmluZChCb29sZWFuKTtcblxuICAgICAgICBjb25zdCBpc0NsYXNzVmFsaWRhdG9yRXJyb3IgPSBbXG4gICAgICAgICAgZXJyb3Iuc3RhdHVzID09PSBIdHRwU3RhdHVzLlBSRUNPTkRJVElPTl9GQUlMRUQsXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShlcnJvcj8ucmVzcG9uc2U/Lm1lc3NhZ2UpLFxuICAgICAgICBdLmV2ZXJ5KEJvb2xlYW4pO1xuXG4gICAgICAgIGlmIChpc0NsYXNzVmFsaWRhdG9yRXJyb3IpIHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3I/LnJlc3BvbnNlPy5tZXNzYWdlLmpvaW4oJywgJyk7XG4gICAgICAgICAgZXJyb3IucmVzcG9uc2UubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXF1ZXN0OiBBcGlSZXF1ZXN0ID0gZXhlY3V0aW9uQ29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IGV4ZWN1dGlvbkNvbnRleHQuZ2V0QXJncygpWzBdPy5oZWFkZXJzO1xuXG4gICAgICAgIGVycm9yLnVzZXIgPSBoZWFkZXJzLnVzZXI7XG5cbiAgICAgICAgdGhpcy5zYW5pdGl6ZUV4dGVybmFsRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmICFlcnJvci50cmFjZWlkKSB7XG4gICAgICAgICAgZXJyb3IudHJhY2VpZCA9IGhlYWRlcnMudHJhY2VpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBgJHtleGVjdXRpb25Db250ZXh0LmdldENsYXNzKCkubmFtZX0vJHtleGVjdXRpb25Db250ZXh0LmdldEhhbmRsZXIoKS5uYW1lfWA7XG5cbiAgICAgICAgaWYgKHJlcXVlc3Q/LnRyYWNpbmcpIHtcbiAgICAgICAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKHJlcXVlc3QudHJhY2luZy50YWdzLkVSUk9SLCB0cnVlKTtcbiAgICAgICAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdtZXNzYWdlJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygnc3RhdHVzQ29kZScsIGVycm9yLnN0YXR1cyk7XG4gICAgICAgICAgcmVxdWVzdC50cmFjaW5nLmFkZFRhZ3MoeyB0cmFjZUlkOiBlcnJvci50cmFjZWlkIH0pO1xuICAgICAgICAgIHJlcXVlc3QudHJhY2luZy5maW5pc2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVycm9yLmNvbnRleHQgPSBlcnJvci5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJpdmF0ZSBzYW5pdGl6ZUV4dGVybmFsRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIGlmICh0eXBlb2YgZXJyb3I/LnJlc3BvbnNlID09PSAnb2JqZWN0JyAmJiBlcnJvcj8uaXNBeGlvc0Vycm9yKSB7XG4gICAgICBlcnJvclsnZ2V0UmVzcG9uc2UnXSA9ICgpID0+ICh7IC4uLmVycm9yPy5yZXNwb25zZT8uZGF0YT8uZXJyb3IgfSk7XG4gICAgICBlcnJvclsnZ2V0U3RhdHVzJ10gPSAoKSA9PiBbZXJyb3I/LnJlc3BvbnNlPy5kYXRhPy5lcnJvcj8uY29kZSwgZXJyb3I/LnN0YXR1c10uZmluZChCb29sZWFuKTtcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBbZXJyb3I/LnJlc3BvbnNlPy5kYXRhPy5lcnJvcj8ubWVzc2FnZSwgZXJyb3IubWVzc2FnZV0uZmluZChCb29sZWFuKTtcbiAgICAgIGVycm9yLnRyYWNlaWQgPSBlcnJvcj8ucmVzcG9uc2U/LmRhdGE/LmVycm9yPy50cmFjZWlkO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FsbEhhbmRsZXIsIEV4ZWN1dGlvbkNvbnRleHQsIEluamVjdGFibGUsIE5lc3RJbnRlcmNlcHRvciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IElMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2dsb2JhbC9sb2dnZXIvYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBMb2dnZXJJbnRlcmNlcHRvciBpbXBsZW1lbnRzIE5lc3RJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyU2VydmljZTogSUxvZ2dlclNlcnZpY2UpIHt9XG4gIGludGVyY2VwdChleGVjdXRpb25Db250ZXh0OiBFeGVjdXRpb25Db250ZXh0LCBuZXh0OiBDYWxsSGFuZGxlcik6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBgJHtleGVjdXRpb25Db250ZXh0LmdldENsYXNzKCkubmFtZX0vJHtleGVjdXRpb25Db250ZXh0LmdldEhhbmRsZXIoKS5uYW1lfWA7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZXhlY3V0aW9uQ29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBleGVjdXRpb25Db250ZXh0LnN3aXRjaFRvSHR0cCgpLmdldFJlc3BvbnNlKCk7XG5cbiAgICByZXF1ZXN0Wydjb250ZXh0J10gPSBjb250ZXh0O1xuXG4gICAgaWYgKCFyZXF1ZXN0LmhlYWRlcnM/LnRyYWNlaWQpIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy50cmFjZWlkID0gdXVpZHY0KCk7XG4gICAgICByZXF1ZXN0LmlkID0gcmVxdWVzdC5oZWFkZXJzLnRyYWNlaWQ7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXJTZXJ2aWNlLnBpbm8ocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDYWxsSGFuZGxlcixcbiAgRXhlY3V0aW9uQ29udGV4dCxcbiAgSW5qZWN0YWJsZSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbixcbiAgTmVzdEludGVyY2VwdG9yLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgaW5pdFRyYWNlciwgSmFlZ2VyVHJhY2VyLCBUcmFjaW5nQ29uZmlnLCBUcmFjaW5nT3B0aW9ucyB9IGZyb20gJ2phZWdlci1jbGllbnQnO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcbmltcG9ydCB7IFRyYWNpbmdUeXBlIH0gZnJvbSAnbGlicy91dGlscyc7XG5pbXBvcnQgeyBGT1JNQVRfSFRUUF9IRUFERVJTLCBTcGFuLCBTcGFuT3B0aW9ucywgVGFncyB9IGZyb20gJ29wZW50cmFjaW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRhcCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhY2luZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSB0cmFjZXI6IEphZWdlclRyYWNlcjtcbiAgcHJpdmF0ZSBhcHA6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7IGFwcCwgdmVyc2lvbiB9OiB7IGFwcDogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmcgfSwgbG9nZ2VyOiBJTG9nZ2VyU2VydmljZSkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuXG4gICAgY29uc3QgY29uZmlnOiBUcmFjaW5nQ29uZmlnID0ge1xuICAgICAgc2VydmljZU5hbWU6IGFwcCxcbiAgICAgIHNhbXBsZXI6IHtcbiAgICAgICAgdHlwZTogJ2NvbnN0JyxcbiAgICAgICAgcGFyYW06IDEsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBvcHRpb25zOiBUcmFjaW5nT3B0aW9ucyA9IHRoaXMuZ2V0VHJhY2luZ0xvZ2dlcihsb2dnZXIpO1xuXG4gICAgb3B0aW9ucy50YWdzID0ge1xuICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICAgIGFwcDogYXBwLFxuICAgIH07XG5cbiAgICB0aGlzLnRyYWNlciA9IGluaXRUcmFjZXIoY29uZmlnLCBvcHRpb25zKTtcbiAgfVxuXG4gIGludGVyY2VwdChleGVjdXRpb25Db250ZXh0OiBFeGVjdXRpb25Db250ZXh0LCBuZXh0OiBDYWxsSGFuZGxlcik6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBgJHtleGVjdXRpb25Db250ZXh0LmdldENsYXNzKCkubmFtZX0vJHtleGVjdXRpb25Db250ZXh0LmdldEhhbmRsZXIoKS5uYW1lfWA7XG4gICAgY29uc3QgcmVxdWVzdCA9IGV4ZWN1dGlvbkNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVxdWVzdCgpO1xuICAgIGNvbnN0IHJlcyA9IGV4ZWN1dGlvbkNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVzcG9uc2UoKTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMudHJhY2VyLmV4dHJhY3QoRk9STUFUX0hUVFBfSEVBREVSUywgcmVxdWVzdC5oZWFkZXJzKTtcbiAgICBjb25zdCBwYXJlbnRPYmplY3QgPSBwYXJlbnQgPyB7IGNoaWxkT2Y6IHBhcmVudCB9IDoge307XG4gICAgY29uc3Qgc3BhbiA9IHRoaXMudHJhY2VyLnN0YXJ0U3BhbihyZXF1ZXN0LmhlYWRlcnMuaG9zdCArIHJlcXVlc3QucGF0aCwgcGFyZW50T2JqZWN0KTtcblxuICAgIGNvbnN0IGNyZWF0ZUphZWdlckluc3RhbmNlID0gKCk6IFRyYWNpbmdUeXBlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNwYW46IHNwYW4sXG4gICAgICAgIHRyYWNlcjogdGhpcy50cmFjZXIsXG4gICAgICAgIHRhZ3M6IFRhZ3MsXG4gICAgICAgIGF4aW9zOiAob3B0aW9uczogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgICAgdGhpcy50cmFjZXIuaW5qZWN0KHNwYW4sIEZPUk1BVF9IVFRQX0hFQURFUlMsIGhlYWRlcnMpO1xuICAgICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IHsgLi4ub3B0aW9ucy5oZWFkZXJzLCAuLi5oZWFkZXJzLCB0cmFjZWlkOiByZXF1ZXN0LmlkIH07XG5cbiAgICAgICAgICByZXR1cm4gYXhpb3MuY3JlYXRlKG9wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgICBsb2c6IChldmVudE5hbWUsIHBheWxvYWQpID0+IHtcbiAgICAgICAgICBzcGFuLmxvZ0V2ZW50KGV2ZW50TmFtZSwgcGF5bG9hZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRhZzogKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICBzcGFuLnNldFRhZyhrZXksIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkVGFnczogKG9iamVjdCkgPT4ge1xuICAgICAgICAgIHNwYW4uYWRkVGFncyhvYmplY3QpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRUcmFjaW5nVGFnOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHNwYW4uc2V0VGFnKGtleSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBmaW5pc2g6ICgpID0+IHtcbiAgICAgICAgICBzcGFuLmZpbmlzaCgpO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTcGFuOiAobmFtZSwgcGFyZW50OiBTcGFuKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFyZW50T2JqZWN0OiBTcGFuT3B0aW9ucyA9IHBhcmVudCA/IHsgY2hpbGRPZjogcGFyZW50IH0gOiB7IGNoaWxkT2Y6IHNwYW4gfTtcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZXIuc3RhcnRTcGFuKG5hbWUsIHBhcmVudE9iamVjdCk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXF1ZXN0LnRyYWNpbmcgPSBjcmVhdGVKYWVnZXJJbnN0YW5jZSgpO1xuXG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygnaXAnLCByZXF1ZXN0LmlwKTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdhcHAnLCB0aGlzLmFwcCk7XG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZyhUYWdzLkhUVFBfTUVUSE9ELCByZXF1ZXN0Lm1ldGhvZCk7XG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygnaGVhZGVycycsIHJlcXVlc3QuaGVhZGVycyk7XG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygncGF0aCcsIHJlcXVlc3QucGF0aCk7XG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygnYm9keScsIHJlcXVlc3QuYm9keSk7XG4gICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZygncXVlcnknLCByZXF1ZXN0LnF1ZXJ5KTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdjb21wb25lbnQnLCBjb250ZXh0KTtcblxuICAgIGlmIChyZXF1ZXN0LmlkKSB7XG4gICAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCd0cmFjZUlkJywgcmVxdWVzdC5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcoVGFncy5IVFRQX1NUQVRVU19DT0RFLCByZXMuc3RhdHVzQ29kZSk7XG4gICAgICAgIHJlcXVlc3QudHJhY2luZy5maW5pc2goKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFRyYWNpbmdMb2dnZXIobG9nZ2VyOiBJTG9nZ2VyU2VydmljZSk6IFRyYWNpbmdPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9nZ2VyOiB7XG4gICAgICAgIGluZm86IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBsb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlIGFzIHVua25vd24gYXMgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbik7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE5lc3RNaWRkbGV3YXJlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vYWRhcHRlcic7XG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXInO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJc0xvZ2dlZE1pZGRsZXdhcmUgaW1wbGVtZW50cyBOZXN0TWlkZGxld2FyZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9rZW5TZXJ2aWNlOiBJVG9rZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyU2VydmljZTogSUxvZ2dlclNlcnZpY2UsXG4gICkge31cbiAgYXN5bmMgdXNlKHJlcXVlc3Q6IFJlcXVlc3QsIHJlc3BvbnNlOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdG9rZW5IZWFkZXIgPSByZXF1ZXN0LmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcblxuICAgIGlmICghdG9rZW5IZWFkZXIpIHtcbiAgICAgIGlmICghcmVxdWVzdC5oZWFkZXJzPy50cmFjZWlkKSB7XG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy50cmFjZWlkID0gdXVpZHY0KCk7XG4gICAgICB9XG4gICAgICByZXNwb25zZS5zdGF0dXMoNDEyKTtcbiAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5waW5vKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ25vIHRva2VuIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbkhlYWRlci5zcGxpdCgnICcpWzFdO1xuXG4gICAgY29uc3QgdXNlckRlY29kZWQ6IHsgdXNlcklkPzogc3RyaW5nIH0gPSBhd2FpdCB0aGlzLnRva2VuU2VydmljZS52ZXJpZnkodG9rZW4pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc3QgdG9rZW5EZWNvZGVkOiB7IHVzZXJJZD86IHN0cmluZyB9ID0gdGhpcy50b2tlblNlcnZpY2UuZGVjb2RlKHRva2VuKTtcbiAgICAgIGVycm9yLnVzZXIgPSB0b2tlbkRlY29kZWQ/LnVzZXJJZDtcblxuICAgICAgaWYgKCFyZXF1ZXN0LmhlYWRlcnM/LnRyYWNlaWQpIHtcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnRyYWNlaWQgPSB1dWlkdjQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLnBpbm8ocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgICAgbmV4dChlcnJvcik7XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmhlYWRlcnMudXNlciA9IHVzZXJEZWNvZGVkPy51c2VySWQ7XG5cbiAgICBuZXh0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IEphZWdlclRyYWNlciB9IGZyb20gJ2phZWdlci1jbGllbnQnO1xuaW1wb3J0IHsgU3BhbiwgVGFncyB9IGZyb20gJ29wZW50cmFjaW5nJztcblxuZXhwb3J0IHR5cGUgVHJhY2luZ1R5cGUgPSB7XG4gIHNwYW46IFNwYW47XG4gIHRyYWNlcjogSmFlZ2VyVHJhY2VyO1xuICB0YWdzOiB0eXBlb2YgVGFncztcbiAgYXhpb3M6IChjb25maWc/OiBBeGlvc1JlcXVlc3RDb25maWcpID0+IEF4aW9zSW5zdGFuY2U7XG4gIGxvZzogKGV2ZW50OiBzdHJpbmcsIHBheWxvYWQ6IHVua25vd24pID0+IHZvaWQ7XG4gIHNldFRhZzogKGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikgPT4gdm9pZDtcbiAgYWRkVGFnczogKG9iamVjdDogb2JqZWN0KSA9PiB2b2lkO1xuICBzZXRUcmFjaW5nVGFnOiAodGFnOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKSA9PiB2b2lkO1xuICBjcmVhdGVTcGFuOiAobmFtZTogc3RyaW5nLCBwYXJlbnQ/OiBTcGFuKSA9PiBTcGFuO1xuICBmaW5pc2g6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwaVJlcXVlc3QgZXh0ZW5kcyBCb2R5IHtcbiAgcmVhZG9ubHkgaWQ6IHN0cmluZztcbiAgcmVhZG9ubHkgY2FjaGU6IFJlcXVlc3RDYWNoZTtcbiAgcmVhZG9ubHkgdHJhY2luZzogVHJhY2luZ1R5cGU7XG4gIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBSZXF1ZXN0Q3JlZGVudGlhbHM7XG4gIHJlYWRvbmx5IGRlc3RpbmF0aW9uOiBSZXF1ZXN0RGVzdGluYXRpb247XG4gIHJlYWRvbmx5IGhlYWRlcnM6IEhlYWRlcnM7XG4gIHJlYWRvbmx5IGludGVncml0eTogc3RyaW5nO1xuICByZWFkb25seSBrZWVwYWxpdmU6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG1ldGhvZDogc3RyaW5nO1xuICByZWFkb25seSBtb2RlOiBSZXF1ZXN0TW9kZTtcbiAgcmVhZG9ubHkgcmVkaXJlY3Q6IFJlcXVlc3RSZWRpcmVjdDtcbiAgcmVhZG9ubHkgcmVmZXJyZXI6IHN0cmluZztcbiAgcmVhZG9ubHkgcmVmZXJyZXJQb2xpY3k6IFJlZmVycmVyUG9saWN5O1xuICByZWFkb25seSBzaWduYWw6IEFib3J0U2lnbmFsO1xuICByZWFkb25seSB1cmw6IHN0cmluZztcbiAgY2xvbmUoKTogUmVxdWVzdDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL21vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc3dhZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb2xvcmV0dGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29udmVydC1waW5vLXJlcXVlc3QtdG8tY3VybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqYWVnZXItY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsdXhvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvcGVudHJhY2luZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwaW5vXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBpbm8tZWxhc3RpY3NlYXJjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwaW5vLWh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGluby1wcmV0dHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBIdHRwU3RhdHVzLCBSZXF1ZXN0TWV0aG9kLCBWYWxpZGF0aW9uUGlwZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50QnVpbGRlciwgU3dhZ2dlck1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBkZXNjcmlwdGlvbiwgbmFtZSwgdmVyc2lvbiB9IGZyb20gJ2FwcHMvY2F0cy1hcGkvcGFja2FnZS5qc29uJztcbmltcG9ydCB7IGJvbGQgfSBmcm9tICdjb2xvcmV0dGUnO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IERFRkFVTFRfVEFHLCBTV0FHR0VSX0FQSV9ST09UIH0gZnJvbSAnbGlicy91dGlscy9kb2N1bWVudGF0aW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBcHBFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdsaWJzL3V0aWxzL2ZpbHRlcnMvaHR0cC1leGNlcHRpb24uZmlsdGVyJztcbmltcG9ydCB7IEV4Y2VwdGlvbkludGVyY2VwdG9yIH0gZnJvbSAnbGlicy91dGlscy9pbnRlcmNlcHRvcnMvZXhjZXB0aW9uL2h0dHAtZXhjZXB0aW9uLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEh0dHBMb2dnZXJJbnRlcmNlcHRvciB9IGZyb20gJ2xpYnMvdXRpbHMvaW50ZXJjZXB0b3JzL2xvZ2dlci9odHRwLWxvZ2dlci5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBUcmFjaW5nSW50ZXJjZXB0b3IgfSBmcm9tICdsaWJzL3V0aWxzL2ludGVyY2VwdG9ycy9sb2dnZXIvaHR0cC10cmFjaW5nLmludGVyY2VwdG9yJztcblxuaW1wb3J0IHsgTWFpbk1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9tb2R1bGUnO1xuXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShNYWluTW9kdWxlLCB7XG4gICAgYnVmZmVyTG9nczogdHJ1ZSxcbiAgICBjb3JzOiB0cnVlLFxuICB9KTtcblxuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIGVycm9ySHR0cFN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuUFJFQ09ORElUSU9OX0ZBSUxFRCxcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdCBsb2dnZXJTZXJ2aWNlID0gYXBwLmdldChJTG9nZ2VyU2VydmljZSk7XG5cbiAgbG9nZ2VyU2VydmljZS5zZXRBcHBsaWNhdGlvbihuYW1lKTtcbiAgYXBwLnVzZUdsb2JhbEZpbHRlcnMobmV3IEFwcEV4Y2VwdGlvbkZpbHRlcihsb2dnZXJTZXJ2aWNlKSk7XG5cbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhcbiAgICBuZXcgRXhjZXB0aW9uSW50ZXJjZXB0b3IoKSxcbiAgICBuZXcgSHR0cExvZ2dlckludGVyY2VwdG9yKGxvZ2dlclNlcnZpY2UpLFxuICAgIG5ldyBUcmFjaW5nSW50ZXJjZXB0b3IoeyBhcHA6IG5hbWUsIHZlcnNpb246IHZlcnNpb24gfSwgbG9nZ2VyU2VydmljZSksXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIG1haW5BUEk6IHsgcG9ydDogUE9SVCwgdXJsIH0sXG4gICAgRU5WLFxuICAgIEtJQkFOQV9VUkwsXG4gICAgSkVBR0VSX1VSTCxcbiAgICBNT05HT19FWFBSRVNTX1VSTCxcbiAgICBSRURJU19DT01NQU5ERVJfVVJMLFxuICB9ID0gYXBwLmdldChJU2VjcmV0c1NlcnZpY2UpO1xuXG4gIGFwcC51c2VMb2dnZXIobG9nZ2VyU2VydmljZSk7XG5cbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpJywge1xuICAgIGV4Y2x1ZGU6IFt7IHBhdGg6ICdoZWFsdGgnLCBtZXRob2Q6IFJlcXVlc3RNZXRob2QuR0VUIH1dLFxuICB9KTtcblxuICBjb25zdCBjb25maWcgPSBuZXcgRG9jdW1lbnRCdWlsZGVyKClcbiAgICAuYWRkQmVhcmVyQXV0aCgpXG4gICAgLnNldFRpdGxlKG5hbWUpXG4gICAgLnNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKVxuICAgIC5zZXRWZXJzaW9uKHZlcnNpb24pXG4gICAgLmFkZFRhZyhERUZBVUxUX1RBRylcbiAgICAuYnVpbGQoKTtcblxuICBjb25zdCBkb2N1bWVudCA9IFN3YWdnZXJNb2R1bGUuY3JlYXRlRG9jdW1lbnQoYXBwLCBjb25maWcpO1xuICBTd2FnZ2VyTW9kdWxlLnNldHVwKFNXQUdHRVJfQVBJX1JPT1QsIGFwcCwgZG9jdW1lbnQpO1xuXG4gIGxvZ2dlclNlcnZpY2UubG9nKGDwn5+iICR7bmFtZX0gbGlzdGVuaW5nIGF0ICR7Ym9sZChQT1JUKX0gb24gJHtib2xkKEVOVj8udG9VcHBlckNhc2UoKSl9IPCfn6JcXG5gKTtcblxuICBhd2FpdCBhcHAubGlzdGVuKFBPUlQpO1xuXG4gIGNvbnN0IG9wZW5BcGlVUkwgPSBgJHt1cmx9LyR7U1dBR0dFUl9BUElfUk9PVH1gO1xuXG4gIGxvZ2dlclNlcnZpY2UubG9nKGDwn5S1IHN3YWdnZXIgbGlzdGVuaW5nIGF0ICR7Ym9sZChvcGVuQXBpVVJMKX1gKTtcbiAgbG9nZ2VyU2VydmljZS5sb2coYPCflLUgbW9uZ28tZXhwcmVzcyBsaXN0ZW5pbmcgYXQgJHtib2xkKE1PTkdPX0VYUFJFU1NfVVJMKX1gKTtcbiAgbG9nZ2VyU2VydmljZS5sb2coYPCflLUgcmVkaXMtY29tbWFuZGVyIGxpc3RlbmluZyBhdCAke2JvbGQoUkVESVNfQ09NTUFOREVSX1VSTCl9YCk7XG4gIGxvZ2dlclNlcnZpY2UubG9nKGDwn5S1IGtpYmFuYSBsaXN0ZW5pbmcgYXQgJHtib2xkKEtJQkFOQV9VUkwpfWApO1xuICBsb2dnZXJTZXJ2aWNlLmxvZyhg8J+UtSBqZWFnZXIgbGlzdGVuaW5nIGF0ICR7Ym9sZChKRUFHRVJfVVJMKX1gKTtcbn1cblxuYm9vdHN0cmFwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=