/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-api/src/modules/health/adapter.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-api/src/modules/health/adapter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHealthService = void 0;
class IHealthService {
}
exports.IHealthService = IHealthService;


/***/ }),

/***/ "./apps/auth-api/src/modules/health/controller.ts":
/*!********************************************************!*\
  !*** ./apps/auth-api/src/modules/health/controller.ts ***!
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
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/auth-api/src/modules/health/adapter.ts");
const swagger_2 = __webpack_require__(/*! ./swagger */ "./apps/auth-api/src/modules/health/swagger.ts");
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

/***/ "./apps/auth-api/src/modules/health/module.ts":
/*!****************************************************!*\
  !*** ./apps/auth-api/src/modules/health/module.ts ***!
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
const module_1 = __webpack_require__(/*! libs/modules/global/logger/module */ "./libs/modules/global/logger/module.ts");
const module_2 = __webpack_require__(/*! ../user/module */ "./apps/auth-api/src/modules/user/module.ts");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/auth-api/src/modules/health/adapter.ts");
const controller_1 = __webpack_require__(/*! ./controller */ "./apps/auth-api/src/modules/health/controller.ts");
const service_1 = __webpack_require__(/*! ./service */ "./apps/auth-api/src/modules/health/service.ts");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [module_2.UserModule, module_1.LoggerModule],
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

/***/ "./apps/auth-api/src/modules/health/service.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-api/src/modules/health/service.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const package_json_1 = __webpack_require__(/*! apps/auth-api/package.json */ "./apps/auth-api/package.json");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const adapter_2 = __webpack_require__(/*! ../user/adapter */ "./apps/auth-api/src/modules/user/adapter.ts");
let HealthService = class HealthService {
    userRepository;
    loggerService;
    constructor(userRepository, loggerService) {
        this.userRepository = userRepository;
        this.loggerService = loggerService;
    }
    async getText() {
        const appName = `${package_json_1.name}-${package_json_1.version} UP!!`;
        this.loggerService.info({ message: appName, context: `HealthService/getText` });
        await this.userRepository.isConnected();
        return appName;
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_2.IUserRepository !== "undefined" && adapter_2.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof adapter_1.ILoggerService !== "undefined" && adapter_1.ILoggerService) === "function" ? _b : Object])
], HealthService);


/***/ }),

/***/ "./apps/auth-api/src/modules/health/swagger.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-api/src/modules/health/swagger.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwagggerRequest = exports.SwagggerResponse = void 0;
const package_json_1 = __webpack_require__(/*! apps/auth-api/package.json */ "./apps/auth-api/package.json");
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
exports.SwagggerRequest = {};


/***/ }),

/***/ "./apps/auth-api/src/modules/login/adapter.ts":
/*!****************************************************!*\
  !*** ./apps/auth-api/src/modules/login/adapter.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ILoginService = void 0;
class ILoginService {
}
exports.ILoginService = ILoginService;


/***/ }),

/***/ "./apps/auth-api/src/modules/login/controller.ts":
/*!*******************************************************!*\
  !*** ./apps/auth-api/src/modules/login/controller.ts ***!
  \*******************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const adapter_1 = __webpack_require__(/*! libs/modules/auth/token/adapter */ "./libs/modules/auth/token/adapter.ts");
const entity_1 = __webpack_require__(/*! ../user/entity */ "./apps/auth-api/src/modules/user/entity.ts");
const adapter_2 = __webpack_require__(/*! ./adapter */ "./apps/auth-api/src/modules/login/adapter.ts");
const swagger_2 = __webpack_require__(/*! ./swagger */ "./apps/auth-api/src/modules/login/swagger.ts");
let LoginController = class LoginController {
    loginService;
    tokenService;
    constructor(loginService, tokenService) {
        this.loginService = loginService;
        this.tokenService = tokenService;
    }
    async login(entity) {
        const user = await this.loginService.login(entity);
        return this.tokenService.sign({ userId: user.id });
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.login[200]),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.login[412]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entity_1.UserEntity !== "undefined" && entity_1.UserEntity) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], LoginController.prototype, "login", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('login'),
    (0, swagger_1.ApiTags)('login'),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_2.ILoginService !== "undefined" && adapter_2.ILoginService) === "function" ? _a : Object, typeof (_b = typeof adapter_1.ITokenService !== "undefined" && adapter_1.ITokenService) === "function" ? _b : Object])
], LoginController);


/***/ }),

/***/ "./apps/auth-api/src/modules/login/module.ts":
/*!***************************************************!*\
  !*** ./apps/auth-api/src/modules/login/module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const module_1 = __webpack_require__(/*! libs/modules/auth/token/module */ "./libs/modules/auth/token/module.ts");
const module_2 = __webpack_require__(/*! ../user/module */ "./apps/auth-api/src/modules/user/module.ts");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/auth-api/src/modules/login/adapter.ts");
const controller_1 = __webpack_require__(/*! ./controller */ "./apps/auth-api/src/modules/login/controller.ts");
const service_1 = __webpack_require__(/*! ./service */ "./apps/auth-api/src/modules/login/service.ts");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.TokenModule, module_2.UserModule],
        controllers: [controller_1.LoginController],
        providers: [
            {
                provide: adapter_1.ILoginService,
                useClass: service_1.LoginService,
            },
        ],
        exports: [adapter_1.ILoginService],
    })
], LoginModule);


/***/ }),

/***/ "./apps/auth-api/src/modules/login/service.ts":
/*!****************************************************!*\
  !*** ./apps/auth-api/src/modules/login/service.ts ***!
  \****************************************************/
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
exports.LoginService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const utils_1 = __webpack_require__(/*! libs/utils */ "./libs/utils/index.ts");
const adapter_1 = __webpack_require__(/*! ../user/adapter */ "./apps/auth-api/src/modules/user/adapter.ts");
let LoginService = class LoginService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(model) {
        const user = await this.userRepository.findOne({ login: model.login, pass: model.pass });
        if (!user)
            throw new utils_1.ApiException(`username or password is invalid.`, common_1.HttpStatus.PRECONDITION_FAILED);
        return user;
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof adapter_1.IUserRepository !== "undefined" && adapter_1.IUserRepository) === "function" ? _a : Object])
], LoginService);


/***/ }),

/***/ "./apps/auth-api/src/modules/login/swagger.ts":
/*!****************************************************!*\
  !*** ./apps/auth-api/src/modules/login/swagger.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwagggerRequest = exports.SwagggerResponse = void 0;
const swagger_1 = __webpack_require__(/*! libs/utils/documentation/swagger */ "./libs/utils/documentation/swagger.ts");
exports.SwagggerResponse = {
    login: {
        200: swagger_1.Swagger.defaultResponseJSON({
            status: 200,
            json: { token: '<token>' },
            description: 'user logged',
        }),
        412: swagger_1.Swagger.defaultResponseError({
            status: 412,
            route: 'api/login',
            message: 'username or password is invalid.',
            description: 'username or password is invalid.',
        }),
    },
};
exports.SwagggerRequest = {};


/***/ }),

/***/ "./apps/auth-api/src/modules/module.ts":
/*!*********************************************!*\
  !*** ./apps/auth-api/src/modules/module.ts ***!
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
const module_1 = __webpack_require__(/*! libs/modules/auth/token/module */ "./libs/modules/auth/token/module.ts");
const module_2 = __webpack_require__(/*! libs/modules/global/logger/module */ "./libs/modules/global/logger/module.ts");
const module_3 = __webpack_require__(/*! libs/modules/global/module */ "./libs/modules/global/module.ts");
const module_4 = __webpack_require__(/*! ./health/module */ "./apps/auth-api/src/modules/health/module.ts");
const module_5 = __webpack_require__(/*! ./login/module */ "./apps/auth-api/src/modules/login/module.ts");
const module_6 = __webpack_require__(/*! ./user/module */ "./apps/auth-api/src/modules/user/module.ts");
let MainModule = class MainModule {
};
exports.MainModule = MainModule;
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        imports: [module_4.HealthModule, module_3.GlobalModule, modules_1.AuthDatabaseModule, module_1.TokenModule, module_5.LoginModule, module_6.UserModule, module_2.LoggerModule],
    })
], MainModule);


/***/ }),

/***/ "./apps/auth-api/src/modules/user/adapter.ts":
/*!***************************************************!*\
  !*** ./apps/auth-api/src/modules/user/adapter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IUserRepository = void 0;
const modules_1 = __webpack_require__(/*! libs/modules */ "./libs/modules/index.ts");
class IUserRepository extends modules_1.IRepository {
}
exports.IUserRepository = IUserRepository;


/***/ }),

/***/ "./apps/auth-api/src/modules/user/entity.ts":
/*!**************************************************!*\
  !*** ./apps/auth-api/src/modules/user/entity.ts ***!
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
exports.UserEntity = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UserEntity {
    id;
    login;
    pass;
}
exports.UserEntity = UserEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UserEntity.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UserEntity.prototype, "pass", void 0);


/***/ }),

/***/ "./apps/auth-api/src/modules/user/module.ts":
/*!**************************************************!*\
  !*** ./apps/auth-api/src/modules/user/module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const enum_1 = __webpack_require__(/*! libs/modules/database/enum */ "./libs/modules/database/enum.ts");
const adapter_1 = __webpack_require__(/*! ./adapter */ "./apps/auth-api/src/modules/user/adapter.ts");
const repository_1 = __webpack_require__(/*! ./repository */ "./apps/auth-api/src/modules/user/repository.ts");
const schema_1 = __webpack_require__(/*! ./schema */ "./apps/auth-api/src/modules/user/schema.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [
            {
                provide: adapter_1.IUserRepository,
                useFactory: (connection) => new repository_1.UserRepository(connection.model(schema_1.User.name, schema_1.UserSchema)),
                inject: [(0, mongoose_1.getConnectionToken)(enum_1.ConnectionName.AUTH)],
            },
        ],
        exports: [adapter_1.IUserRepository],
    })
], UserModule);


/***/ }),

/***/ "./apps/auth-api/src/modules/user/repository.ts":
/*!******************************************************!*\
  !*** ./apps/auth-api/src/modules/user/repository.ts ***!
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
exports.UserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const modules_1 = __webpack_require__(/*! libs/modules */ "./libs/modules/index.ts");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const schema_1 = __webpack_require__(/*! ./schema */ "./apps/auth-api/src/modules/user/schema.ts");
let UserRepository = class UserRepository extends modules_1.Repository {
    entity;
    constructor(entity) {
        super(entity);
        this.entity = entity;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserRepository);


/***/ }),

/***/ "./apps/auth-api/src/modules/user/schema.ts":
/*!**************************************************!*\
  !*** ./apps/auth-api/src/modules/user/schema.ts ***!
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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let User = class User {
    login;
    pass;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "pass", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

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

/***/ "./apps/auth-api/package.json":
/*!************************************!*\
  !*** ./apps/auth-api/package.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@app/auth.api","version":"v0.0.22","description":"monorepo auth-api","scripts":{"format":"../../tools/eslint/node_modules/.bin/prettier --write \\"**/*.{ts, js, json}\\"","test":"../../node_modules/jest/bin/jest.js --maxWorkers=50%","lint":"yarn format && ../../tools/eslint/node_modules/.bin/eslint \\"src/**/*.{ts, js, json}\\" --fix"},"author":{"name":"Mike Lima","email":"mike.rodrigues.lima@gmail.com"},"engines":{"node":"18"},"license":"MIT"}');

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
  !*** ./apps/auth-api/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const package_json_1 = __webpack_require__(/*! apps/auth-api/package.json */ "./apps/auth-api/package.json");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const adapter_1 = __webpack_require__(/*! libs/modules/global/logger/adapter */ "./libs/modules/global/logger/adapter.ts");
const adapter_2 = __webpack_require__(/*! libs/modules/global/secrets/adapter */ "./libs/modules/global/secrets/adapter.ts");
const constants_1 = __webpack_require__(/*! libs/utils/documentation/constants */ "./libs/utils/documentation/constants.ts");
const http_exception_filter_1 = __webpack_require__(/*! libs/utils/filters/http-exception.filter */ "./libs/utils/filters/http-exception.filter.ts");
const http_exception_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/exception/http-exception.interceptor */ "./libs/utils/interceptors/exception/http-exception.interceptor.ts");
const http_logger_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/logger/http-logger.interceptor */ "./libs/utils/interceptors/logger/http-logger.interceptor.ts");
const http_tracing_interceptor_1 = __webpack_require__(/*! libs/utils/interceptors/logger/http-tracing.interceptor */ "./libs/utils/interceptors/logger/http-tracing.interceptor.ts");
const module_1 = __webpack_require__(/*! ./modules/module */ "./apps/auth-api/src/modules/module.ts");
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
    const { authAPI: { port: PORT, url }, ENV, KIBANA_URL, JEAGER_URL, MONGO_EXPRESS_URL, REDIS_COMMANDER_URL, } = app.get(adapter_2.ISecretsService);
    app.useLogger(loggerService);
    app.useGlobalPipes(new common_1.ValidationPipe({ errorHttpStatusCode: common_1.HttpStatus.PRECONDITION_FAILED }));
    app.setGlobalPrefix('api', {
        exclude: [{ path: 'health', method: common_1.RequestMethod.GET }],
    });
    const config = new swagger_1.DocumentBuilder()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQW1DLG9CQUFJLEVBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEYsYUFBYSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsb0JBQUksRUFBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEUsYUFBYSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsb0JBQUksRUFBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUNELFNBQVMsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL2hlYWx0aC9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9hdXRoLWFwaS9zcmMvbW9kdWxlcy9oZWFsdGgvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21vZHVsZXMvaGVhbHRoL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21vZHVsZXMvaGVhbHRoL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL2hlYWx0aC9zd2FnZ2VyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9hdXRoLWFwaS9zcmMvbW9kdWxlcy9sb2dpbi9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9hdXRoLWFwaS9zcmMvbW9kdWxlcy9sb2dpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9hdXRoLWFwaS9zcmMvbW9kdWxlcy9sb2dpbi9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL2xvZ2luL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL2xvZ2luL3N3YWdnZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL21vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21vZHVsZXMvdXNlci9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vYXBwcy9hdXRoLWFwaS9zcmMvbW9kdWxlcy91c2VyL2VudGl0eS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21vZHVsZXMvdXNlci9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9hcHBzL2F1dGgtYXBpL3NyYy9tb2R1bGVzL3VzZXIvcmVwb3NpdG9yeS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21vZHVsZXMvdXNlci9zY2hlbWEudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvYXV0aC90b2tlbi9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vbW9kdWxlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9kYXRhYmFzZS9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2RhdGFiYXNlL2Nvbm5lY3Rpb24vYXV0aC50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9kYXRhYmFzZS9jb25uZWN0aW9uL2NhdHMudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZGF0YWJhc2UvZW51bS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9kYXRhYmFzZS9yZXBvc2l0b3J5LnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2RhdGFiYXNlL3NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2dsb2JhbC9sb2dnZXIvbW9kdWxlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2dsb2JhbC9sb2dnZXIvc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9nbG9iYWwvbW9kdWxlLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy9tb2R1bGVzL2dsb2JhbC9zZWNyZXRzL2FkYXB0ZXIudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL3NlY3JldHMvZW51bS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL21vZHVsZXMvZ2xvYmFsL3NlY3JldHMvc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvbW9kdWxlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvdXRpbHMvZG9jdW1lbnRhdGlvbi9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2RvY3VtZW50YXRpb24vc3dhZ2dlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvdXRpbHMvZXhjZXB0aW9uLnRzIiwid2VicGFjazovL21vbm9yZXBvLy4vbGlicy91dGlscy9maWx0ZXJzL2h0dHAtZXhjZXB0aW9uLmZpbHRlci50cyIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2xpYnMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2ludGVyY2VwdG9ycy9leGNlcHRpb24vaHR0cC1leGNlcHRpb24uaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2ludGVyY2VwdG9ycy9sb2dnZXIvaHR0cC1sb2dnZXIuaW50ZXJjZXB0b3IudHMiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vLi9saWJzL3V0aWxzL2ludGVyY2VwdG9ycy9sb2dnZXIvaHR0cC10cmFjaW5nLmludGVyY2VwdG9yLnRzIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb21tb25cIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvY29uZmlnXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL2NvcmVcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvbW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvc3dhZ2dlclwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcImNsYXNzLXZhbGlkYXRvclwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiY29sb3JldHRlXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJjb252ZXJ0LXBpbm8tcmVxdWVzdC10by1jdXJsXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJqYWVnZXItY2xpZW50XCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcImx1eG9uXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJtb25nb29zZVwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwib3BlbnRyYWNpbmdcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcInBpbm9cIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcInBpbm8tZWxhc3RpY3NlYXJjaFwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwicGluby1odHRwXCIiLCJ3ZWJwYWNrOi8vbW9ub3JlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJwaW5vLXByZXR0eVwiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwicnhqc1wiIiwid2VicGFjazovL21vbm9yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwicnhqcy9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly9tb25vcmVwby9leHRlcm5hbCBjb21tb25qcyBcInV1aWRcIiIsIndlYnBhY2s6Ly9tb25vcmVwby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb25vcmVwby8uL2FwcHMvYXV0aC1hcGkvc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIElIZWFsdGhTZXJ2aWNlIHtcbiAgYWJzdHJhY3QgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz47XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBcGlSZXNwb25zZSwgQXBpVGFncyB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5cbmltcG9ydCB7IElIZWFsdGhTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFN3YWdnZ2VyUmVzcG9uc2UgfSBmcm9tICcuL3N3YWdnZXInO1xuXG5AQ29udHJvbGxlcigpXG5AQXBpVGFncygnaGVhbHRoJylcbmV4cG9ydCBjbGFzcyBIZWFsdGhDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBoZWFsdGhTZXJ2aWNlOiBJSGVhbHRoU2VydmljZSkge31cblxuICBAR2V0KCcvaGVhbHRoJylcbiAgQEFwaVJlc3BvbnNlKFN3YWdnZ2VyUmVzcG9uc2UuZ2V0SGVhbHRoWzIwMF0pXG4gIEBBcGlSZXNwb25zZShTd2FnZ2dlclJlc3BvbnNlLmdldEhlYWx0aFs1MDBdKVxuICBhc3luYyBnZXRIZWFsdGgoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5oZWFsdGhTZXJ2aWNlLmdldFRleHQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTG9nZ2VyTW9kdWxlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2dsb2JhbC9sb2dnZXIvbW9kdWxlJztcblxuaW1wb3J0IHsgVXNlck1vZHVsZSB9IGZyb20gJy4uL3VzZXIvbW9kdWxlJztcbmltcG9ydCB7IElIZWFsdGhTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IEhlYWx0aENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgSGVhbHRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbVXNlck1vZHVsZSwgTG9nZ2VyTW9kdWxlXSxcbiAgY29udHJvbGxlcnM6IFtIZWFsdGhDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSUhlYWx0aFNlcnZpY2UsXG4gICAgICB1c2VDbGFzczogSGVhbHRoU2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBIZWFsdGhNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBuYW1lLCB2ZXJzaW9uIH0gZnJvbSAnYXBwcy9hdXRoLWFwaS9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcblxuaW1wb3J0IHsgSVVzZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi4vdXNlci9hZGFwdGVyJztcbmltcG9ydCB7IElIZWFsdGhTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlYWx0aFNlcnZpY2UgaW1wbGVtZW50cyBJSGVhbHRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdXNlclJlcG9zaXRvcnk6IElVc2VyUmVwb3NpdG9yeSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlclNlcnZpY2U6IElMb2dnZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGFwcE5hbWUgPSBgJHtuYW1lfS0ke3ZlcnNpb259IFVQISFgO1xuICAgIHRoaXMubG9nZ2VyU2VydmljZS5pbmZvKHsgbWVzc2FnZTogYXBwTmFtZSwgY29udGV4dDogYEhlYWx0aFNlcnZpY2UvZ2V0VGV4dGAgfSk7XG4gICAgYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeS5pc0Nvbm5lY3RlZCgpO1xuICAgIHJldHVybiBhcHBOYW1lO1xuICB9XG59XG4iLCJpbXBvcnQgeyBuYW1lIH0gZnJvbSAnYXBwcy9hdXRoLWFwaS9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgU3dhZ2dlciB9IGZyb20gJ2xpYnMvdXRpbHMvZG9jdW1lbnRhdGlvbi9zd2FnZ2VyJztcblxuZXhwb3J0IGNvbnN0IFN3YWdnZ2VyUmVzcG9uc2UgPSB7XG4gIGdldEhlYWx0aDoge1xuICAgIDIwMDogU3dhZ2dlci5kZWZhdWx0UmVzcG9uc2VUZXh0KHsgc3RhdHVzOiAyMDAsIHRleHQ6IGAke25hbWV9IFVQISFgIH0pLFxuICAgIDUwMDogU3dhZ2dlci5kZWZhdWx0UmVzcG9uc2VFcnJvcih7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIHJvdXRlOiAnL2hlYWx0aCcsXG4gICAgfSksXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgU3dhZ2dnZXJSZXF1ZXN0ID0ge1xuICAvKiogSWYgcmVxdWVzdGVycyBoYXMgYSBib2R5LiAgKi9cbn07XG4iLCJpbXBvcnQgeyBVc2VyRW50aXR5IH0gZnJvbSAnLi4vdXNlci9lbnRpdHknO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSUxvZ2luU2VydmljZSB7XG4gIGFic3RyYWN0IGxvZ2luKHVzZXI6IFVzZXJFbnRpdHkpOiBQcm9taXNlPFVzZXJFbnRpdHk+O1xufVxuIiwiaW1wb3J0IHsgQm9keSwgQ29udHJvbGxlciwgSHR0cENvZGUsIFBvc3QgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBcGlSZXNwb25zZSwgQXBpVGFncyB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBJVG9rZW5TZXJ2aWNlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vYWRhcHRlcic7XG5cbmltcG9ydCB7IFVzZXJFbnRpdHkgfSBmcm9tICcuLi91c2VyL2VudGl0eSc7XG5pbXBvcnQgeyBJTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFN3YWdnZ2VyUmVzcG9uc2UgfSBmcm9tICcuL3N3YWdnZXInO1xuXG5AQ29udHJvbGxlcignbG9naW4nKVxuQEFwaVRhZ3MoJ2xvZ2luJylcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2luU2VydmljZTogSUxvZ2luU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRva2VuU2VydmljZTogSVRva2VuU2VydmljZSxcbiAgKSB7fVxuXG4gIEBQb3N0KClcbiAgQEh0dHBDb2RlKDIwMClcbiAgQEFwaVJlc3BvbnNlKFN3YWdnZ2VyUmVzcG9uc2UubG9naW5bMjAwXSlcbiAgQEFwaVJlc3BvbnNlKFN3YWdnZ2VyUmVzcG9uc2UubG9naW5bNDEyXSlcbiAgYXN5bmMgbG9naW4oQEJvZHkoKSBlbnRpdHk6IFVzZXJFbnRpdHkpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5sb2dpblNlcnZpY2UubG9naW4oZW50aXR5KTtcbiAgICByZXR1cm4gdGhpcy50b2tlblNlcnZpY2Uuc2lnbih7IHVzZXJJZDogdXNlci5pZCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVG9rZW5Nb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMvYXV0aC90b2tlbi9tb2R1bGUnO1xuXG5pbXBvcnQgeyBVc2VyTW9kdWxlIH0gZnJvbSAnLi4vdXNlci9tb2R1bGUnO1xuaW1wb3J0IHsgSUxvZ2luU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtUb2tlbk1vZHVsZSwgVXNlck1vZHVsZV0sXG4gIGNvbnRyb2xsZXJzOiBbTG9naW5Db250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSUxvZ2luU2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBMb2dpblNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbiAgZXhwb3J0czogW0lMb2dpblNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSHR0cFN0YXR1cywgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiB9IGZyb20gJ2xpYnMvdXRpbHMnO1xuXG5pbXBvcnQgeyBJVXNlclJlcG9zaXRvcnkgfSBmcm9tICcuLi91c2VyL2FkYXB0ZXInO1xuaW1wb3J0IHsgVXNlckVudGl0eSB9IGZyb20gJy4uL3VzZXIvZW50aXR5JztcbmltcG9ydCB7IElMb2dpblNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5TZXJ2aWNlIGltcGxlbWVudHMgSUxvZ2luU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgdXNlclJlcG9zaXRvcnk6IElVc2VyUmVwb3NpdG9yeSkge31cblxuICBhc3luYyBsb2dpbihtb2RlbDogVXNlckVudGl0eSk6IFByb21pc2U8VXNlckVudGl0eT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRPbmUoeyBsb2dpbjogbW9kZWwubG9naW4sIHBhc3M6IG1vZGVsLnBhc3MgfSk7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgQXBpRXhjZXB0aW9uKGB1c2VybmFtZSBvciBwYXNzd29yZCBpcyBpbnZhbGlkLmAsIEh0dHBTdGF0dXMuUFJFQ09ORElUSU9OX0ZBSUxFRCk7XG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRva2VuIH0gZnJvbSAnbGlicy9tb2R1bGVzL2F1dGgvdG9rZW4vdHlwZXMnO1xuaW1wb3J0IHsgU3dhZ2dlciB9IGZyb20gJ2xpYnMvdXRpbHMvZG9jdW1lbnRhdGlvbi9zd2FnZ2VyJztcblxuZXhwb3J0IGNvbnN0IFN3YWdnZ2VyUmVzcG9uc2UgPSB7XG4gIGxvZ2luOiB7XG4gICAgMjAwOiBTd2FnZ2VyLmRlZmF1bHRSZXNwb25zZUpTT04oe1xuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICBqc29uOiB7IHRva2VuOiAnPHRva2VuPicgfSBhcyBUb2tlbixcbiAgICAgIGRlc2NyaXB0aW9uOiAndXNlciBsb2dnZWQnLFxuICAgIH0pLFxuICAgIDQxMjogU3dhZ2dlci5kZWZhdWx0UmVzcG9uc2VFcnJvcih7XG4gICAgICBzdGF0dXM6IDQxMixcbiAgICAgIHJvdXRlOiAnYXBpL2xvZ2luJyxcbiAgICAgIG1lc3NhZ2U6ICd1c2VybmFtZSBvciBwYXNzd29yZCBpcyBpbnZhbGlkLicsXG4gICAgICBkZXNjcmlwdGlvbjogJ3VzZXJuYW1lIG9yIHBhc3N3b3JkIGlzIGludmFsaWQuJyxcbiAgICB9KSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBTd2FnZ2dlclJlcXVlc3QgPSB7XG4gIC8qKiBJZiByZXF1ZXN0ZXJzIGhhcyBhIGJvZHkuICAqL1xufTtcbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhEYXRhYmFzZU1vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcyc7XG5pbXBvcnQgeyBUb2tlbk1vZHVsZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9hdXRoL3Rva2VuL21vZHVsZSc7XG5pbXBvcnQgeyBMb2dnZXJNb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9tb2R1bGUnO1xuaW1wb3J0IHsgR2xvYmFsTW9kdWxlIH0gZnJvbSAnbGlicy9tb2R1bGVzL2dsb2JhbC9tb2R1bGUnO1xuXG5pbXBvcnQgeyBIZWFsdGhNb2R1bGUgfSBmcm9tICcuL2hlYWx0aC9tb2R1bGUnO1xuaW1wb3J0IHsgTG9naW5Nb2R1bGUgfSBmcm9tICcuL2xvZ2luL21vZHVsZSc7XG5pbXBvcnQgeyBVc2VyTW9kdWxlIH0gZnJvbSAnLi91c2VyL21vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbSGVhbHRoTW9kdWxlLCBHbG9iYWxNb2R1bGUsIEF1dGhEYXRhYmFzZU1vZHVsZSwgVG9rZW5Nb2R1bGUsIExvZ2luTW9kdWxlLCBVc2VyTW9kdWxlLCBMb2dnZXJNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJUmVwb3NpdG9yeSB9IGZyb20gJ2xpYnMvbW9kdWxlcyc7XG5cbmltcG9ydCB7IFVzZXJEb2N1bWVudCB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElVc2VyUmVwb3NpdG9yeSBleHRlbmRzIElSZXBvc2l0b3J5PFVzZXJEb2N1bWVudD4ge31cbiIsImltcG9ydCB7IEFwaVByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IElzTm90RW1wdHksIE1pbkxlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyRW50aXR5IGltcGxlbWVudHMgVXNlciB7XG4gIGlkPzogc3RyaW5nO1xuICBAQXBpUHJvcGVydHkoKVxuICBASXNOb3RFbXB0eSgpXG4gIEBNaW5MZW5ndGgoNClcbiAgbG9naW46IHN0cmluZztcbiAgQEFwaVByb3BlcnR5KClcbiAgQElzTm90RW1wdHkoKVxuICBATWluTGVuZ3RoKDQpXG4gIHBhc3M6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdldENvbm5lY3Rpb25Ub2tlbiB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbk5hbWUgfSBmcm9tICdsaWJzL21vZHVsZXMvZGF0YWJhc2UvZW51bSc7XG5pbXBvcnQgeyBDb25uZWN0aW9uLCBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IHsgSVVzZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFVzZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi9yZXBvc2l0b3J5JztcbmltcG9ydCB7IFVzZXIsIFVzZXJEb2N1bWVudCwgVXNlclNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSVVzZXJSZXBvc2l0b3J5LFxuICAgICAgdXNlRmFjdG9yeTogKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pID0+XG4gICAgICAgIG5ldyBVc2VyUmVwb3NpdG9yeShjb25uZWN0aW9uLm1vZGVsKFVzZXIubmFtZSwgVXNlclNjaGVtYSkgYXMgdW5rbm93biBhcyBNb2RlbDxVc2VyRG9jdW1lbnQ+KSxcbiAgICAgIGluamVjdDogW2dldENvbm5lY3Rpb25Ub2tlbihDb25uZWN0aW9uTmFtZS5BVVRIKV0sXG4gICAgfSxcbiAgXSxcbiAgZXhwb3J0czogW0lVc2VyUmVwb3NpdG9yeV0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RNb2RlbCB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gJ2xpYnMvbW9kdWxlcyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IHsgSVVzZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFVzZXIsIFVzZXJEb2N1bWVudCB9IGZyb20gJy4vc2NoZW1hJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJSZXBvc2l0b3J5IGV4dGVuZHMgUmVwb3NpdG9yeTxVc2VyRG9jdW1lbnQ+IGltcGxlbWVudHMgSVVzZXJSZXBvc2l0b3J5IHtcbiAgY29uc3RydWN0b3IoQEluamVjdE1vZGVsKFVzZXIubmFtZSkgcHJpdmF0ZSByZWFkb25seSBlbnRpdHk6IE1vZGVsPFVzZXJEb2N1bWVudD4pIHtcbiAgICBzdXBlcihlbnRpdHkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQcm9wLCBTY2hlbWEsIFNjaGVtYUZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IERvY3VtZW50IH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5leHBvcnQgdHlwZSBVc2VyRG9jdW1lbnQgPSBVc2VyICYgRG9jdW1lbnQ7XG5cbkBTY2hlbWEoKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuICBAUHJvcCh7IHVuaXF1ZTogdHJ1ZSwgaW5kZXg6IHRydWUgfSlcbiAgbG9naW46IHN0cmluZztcblxuICBAUHJvcCgpXG4gIHBhc3M6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFVzZXJTY2hlbWEgPSBTY2hlbWFGYWN0b3J5LmNyZWF0ZUZvckNsYXNzKFVzZXIpO1xuIiwiaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJVG9rZW5TZXJ2aWNlIHtcbiAgYWJzdHJhY3Qgc2lnbjxUID0gand0LlNpZ25PcHRpb25zPihtb2RlbDogb2JqZWN0LCBvcHRpb25zPzogVCk6IFRva2VuO1xuICBhYnN0cmFjdCB2ZXJpZnk8VCA9IGp3dC5Kd3RQYXlsb2FkPih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxUIHwgc3RyaW5nIHwgdW5rbm93bj47XG4gIGFic3RyYWN0IGRlY29kZTxUID0gand0Lkp3dFBheWxvYWQ+KHRva2VuOiBzdHJpbmcpOiBUIHwgc3RyaW5nIHwgdW5rbm93bjtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IFNlY3JldHNNb2R1bGUgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL3NlY3JldHMvbW9kdWxlJztcblxuaW1wb3J0IHsgSVRva2VuU2VydmljZSB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1NlY3JldHNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBJVG9rZW5TZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogKHNlY3JldDogSVNlY3JldHNTZXJ2aWNlKSA9PiBuZXcgVG9rZW5TZXJ2aWNlKHNlY3JldCksXG4gICAgICBpbmplY3Q6IFtJU2VjcmV0c1NlcnZpY2VdLFxuICAgIH0sXG4gIF0sXG4gIGV4cG9ydHM6IFtJVG9rZW5TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9rZW5Nb2R1bGUge31cbiIsImltcG9ydCB7IEh0dHBTdGF0dXMsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiB9IGZyb20gJ2xpYnMvdXRpbHMnO1xuXG5pbXBvcnQgeyBJVG9rZW5TZXJ2aWNlIGFzIElUb2tlblNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuL3R5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSBpbXBsZW1lbnRzIElUb2tlblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHNlY3JldDogSVNlY3JldHNTZXJ2aWNlKSB7fVxuXG4gIHNpZ24obW9kZWw6IG9iamVjdCwgb3B0aW9ucz86IGp3dC5TaWduT3B0aW9ucyk6IFRva2VuIHtcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxuICAgICAgbW9kZWwsXG4gICAgICB0aGlzLnNlY3JldC5hdXRoQVBJLmp3dFRva2VuLFxuICAgICAgb3B0aW9ucyB8fCB7XG4gICAgICAgIGV4cGlyZXNJbjogMzAwLCAvLyA1IG1pbnV0ZXNcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiB7IHRva2VuIH07XG4gIH1cblxuICBhc3luYyB2ZXJpZnkodG9rZW46IHN0cmluZyk6IFByb21pc2U8and0Lkp3dFBheWxvYWQgfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICBqd3QudmVyaWZ5KHRva2VuLCB0aGlzLnNlY3JldC5hdXRoQVBJLmp3dFRva2VuLCAoZXJyb3IsIGRlY29kZWQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgIHJlaihuZXcgQXBpRXhjZXB0aW9uKGVycm9yLm1lc3NhZ2UsIEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVELCBgJHtUb2tlblNlcnZpY2UubmFtZX0vJHt0aGlzLnZlcmlmeS5uYW1lfWApKTtcblxuICAgICAgICByZXMoZGVjb2RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlY29kZSh0b2tlbjogc3RyaW5nKTogand0Lkp3dFBheWxvYWQgfCBzdHJpbmcge1xuICAgIHJldHVybiBqd3QuZGVjb2RlKHRva2VuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGVPcHRpb25zIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBGaWx0ZXJRdWVyeSwgUXVlcnlPcHRpb25zLCBTYXZlT3B0aW9ucywgVXBkYXRlUXVlcnksIFVwZGF0ZVdpdGhBZ2dyZWdhdGlvblBpcGVsaW5lIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5pbXBvcnQgeyBDb25uZWN0aW9uTW9kZWwsIENyZWF0ZWRNb2RlbCwgUmVtb3ZlZE1vZGVsLCBVcGRhdGVkTW9kZWwgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElEYXRhQmFzZVNlcnZpY2Uge1xuICBhYnN0cmFjdCBnZXREZWZhdWx0Q29ubmVjdGlvbjxUID0gTW9uZ29vc2VNb2R1bGVPcHRpb25zPihvcHRpb25zPzogQ29ubmVjdGlvbk1vZGVsKTogVDtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElSZXBvc2l0b3J5PFQ+IHtcbiAgYWJzdHJhY3QgaXNDb25uZWN0ZWQoKTogUHJvbWlzZTx2b2lkPjtcblxuICBhYnN0cmFjdCBjcmVhdGU8VCA9IFNhdmVPcHRpb25zPihkb2N1bWVudDogb2JqZWN0LCBzYXZlT3B0aW9ucz86IFQpOiBQcm9taXNlPENyZWF0ZWRNb2RlbD47XG5cbiAgYWJzdHJhY3QgZmluZEJ5SWQoaWQ6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8VD47XG5cbiAgYWJzdHJhY3QgZmluZEFsbCgpOiBQcm9taXNlPFRbXT47XG5cbiAgYWJzdHJhY3QgZmluZDxUUXVlcnkgPSBGaWx0ZXJRdWVyeTxUPiwgVE9wdGlvbnMgPSBRdWVyeU9wdGlvbnM8VD4+KFxuICAgIGZpbHRlcjogVFF1ZXJ5LFxuICAgIG9wdGlvbnM/OiBUT3B0aW9ucyB8IG51bGwsXG4gICk6IFByb21pc2U8VFtdPjtcblxuICBhYnN0cmFjdCByZW1vdmU8VFF1ZXJ5ID0gRmlsdGVyUXVlcnk8VD4+KGZpbHRlcjogVFF1ZXJ5KTogUHJvbWlzZTxSZW1vdmVkTW9kZWw+O1xuXG4gIGFic3RyYWN0IGZpbmRPbmU8VFF1ZXJ5ID0gRmlsdGVyUXVlcnk8VD4sIFRPcHRpb25zID0gUXVlcnlPcHRpb25zPFQ+PihmaWx0ZXI6IFRRdWVyeSwgb3B0aW9ucz86IFRPcHRpb25zKTogUHJvbWlzZTxUPjtcblxuICBhYnN0cmFjdCB1cGRhdGVPbmU8XG4gICAgVFF1ZXJ5ID0gRmlsdGVyUXVlcnk8VD4sXG4gICAgVFVwZGF0ZSA9IFVwZGF0ZVF1ZXJ5PFQ+IHwgVXBkYXRlV2l0aEFnZ3JlZ2F0aW9uUGlwZWxpbmUsXG4gICAgVE9wdGlvbnMgPSBRdWVyeU9wdGlvbnM8VD4sXG4gID4oZmlsdGVyOiBUUXVlcnksIHVwZGF0ZWQ6IFRVcGRhdGUsIG9wdGlvbnM/OiBUT3B0aW9ucyk6IFByb21pc2U8VXBkYXRlZE1vZGVsPjtcblxuICBhYnN0cmFjdCB1cGRhdGVNYW55PFxuICAgIFRRdWVyeSA9IEZpbHRlclF1ZXJ5PFQ+LFxuICAgIFRVcGRhdGUgPSBVcGRhdGVRdWVyeTxUPiB8IFVwZGF0ZVdpdGhBZ2dyZWdhdGlvblBpcGVsaW5lLFxuICAgIFRPcHRpb25zID0gUXVlcnlPcHRpb25zPFQ+LFxuICA+KGZpbHRlcjogVFF1ZXJ5LCB1cGRhdGVkOiBUVXBkYXRlLCBvcHRpb25zPzogVE9wdGlvbnMpOiBQcm9taXNlPFVwZGF0ZWRNb2RlbD47XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBNb25nb29zZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuXG5pbXBvcnQgeyBJU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IFNlY3JldHNNb2R1bGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvc2VjcmV0cy9tb2R1bGUnO1xuaW1wb3J0IHsgSURhdGFCYXNlU2VydmljZSwgSVJlcG9zaXRvcnkgfSBmcm9tICcuLi9hZGFwdGVyJztcbmltcG9ydCB7IENvbm5lY3Rpb25OYW1lIH0gZnJvbSAnLi4vZW51bSc7XG5pbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSAnLi4vcmVwb3NpdG9yeSc7XG5pbXBvcnQgeyBEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElEYXRhQmFzZVNlcnZpY2UsXG4gICAgICB1c2VDbGFzczogRGF0YUJhc2VTZXJ2aWNlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSVJlcG9zaXRvcnksXG4gICAgICB1c2VDbGFzczogUmVwb3NpdG9yeSxcbiAgICB9LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgU2VjcmV0c01vZHVsZSxcbiAgICBNb25nb29zZU1vZHVsZS5mb3JSb290QXN5bmMoe1xuICAgICAgY29ubmVjdGlvbk5hbWU6IENvbm5lY3Rpb25OYW1lLkFVVEgsXG4gICAgICB1c2VGYWN0b3J5OiAoeyBkYXRhYmFzZTogeyBob3N0LCBwb3J0LCBwYXNzLCB1c2VyIH0gfTogSVNlY3JldHNTZXJ2aWNlKSA9PlxuICAgICAgICBuZXcgRGF0YUJhc2VTZXJ2aWNlKCkuZ2V0RGVmYXVsdENvbm5lY3Rpb24oeyBkYk5hbWU6IENvbm5lY3Rpb25OYW1lLkFVVEgsIGhvc3QsIHBhc3MsIHBvcnQsIHVzZXIgfSksXG4gICAgICBpbmplY3Q6IFtJU2VjcmV0c1NlcnZpY2VdLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoRGF0YWJhc2VNb2R1bGUge31cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5cbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJy4uLy4uL2dsb2JhbC9zZWNyZXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgU2VjcmV0c01vZHVsZSB9IGZyb20gJy4uLy4uL2dsb2JhbC9zZWNyZXRzL21vZHVsZSc7XG5pbXBvcnQgeyBJRGF0YUJhc2VTZXJ2aWNlLCBJUmVwb3NpdG9yeSB9IGZyb20gJy4uL2FkYXB0ZXInO1xuaW1wb3J0IHsgQ29ubmVjdGlvbk5hbWUgfSBmcm9tICcuLi9lbnVtJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICcuLi9yZXBvc2l0b3J5JztcbmltcG9ydCB7IERhdGFCYXNlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSURhdGFCYXNlU2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBEYXRhQmFzZVNlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBJUmVwb3NpdG9yeSxcbiAgICAgIHVzZUNsYXNzOiBSZXBvc2l0b3J5LFxuICAgIH0sXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBTZWNyZXRzTW9kdWxlLFxuICAgIE1vbmdvb3NlTW9kdWxlLmZvclJvb3RBc3luYyh7XG4gICAgICBjb25uZWN0aW9uTmFtZTogQ29ubmVjdGlvbk5hbWUuQ0FUUyxcbiAgICAgIHVzZUZhY3Rvcnk6ICh7IGRhdGFiYXNlOiB7IGhvc3QsIHBvcnQsIHBhc3MsIHVzZXIgfSB9OiBJU2VjcmV0c1NlcnZpY2UpID0+XG4gICAgICAgIG5ldyBEYXRhQmFzZVNlcnZpY2UoKS5nZXREZWZhdWx0Q29ubmVjdGlvbih7IGRiTmFtZTogQ29ubmVjdGlvbk5hbWUuQ0FUUywgaG9zdCwgcGFzcywgdXNlciwgcG9ydCB9KSxcbiAgICAgIGluamVjdDogW0lTZWNyZXRzU2VydmljZV0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhdHNEYXRhYmFzZU1vZHVsZSB7fVxuIiwiZXhwb3J0IGVudW0gQ29ubmVjdGlvbk5hbWUge1xuICBDQVRTID0gJ21vbm9yZXBvX2NhdHMnLFxuICBMT0cgPSAnbW9ub3JlcG9fbG9ncycsXG4gIEFVVEggPSAnbW9ub3JlcG9fYXV0aCcsXG59XG4iLCJpbXBvcnQgeyBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnbGlicy91dGlscyc7XG5pbXBvcnQgbW9uZ29kYiBmcm9tICdtb25nb2RiJztcbmltcG9ydCB7XG4gIEZpbHRlclF1ZXJ5LFxuICBNb2RlbCxcbiAgTW9uZ29vc2VRdWVyeU9wdGlvbnMsXG4gIFF1ZXJ5T3B0aW9ucyxcbiAgU2F2ZU9wdGlvbnMsXG4gIFVwZGF0ZVF1ZXJ5LFxuICBVcGRhdGVXaXRoQWdncmVnYXRpb25QaXBlbGluZSxcbn0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgRG9jdW1lbnQgfSBmcm9tICdtb25nb29zZSc7XG5cbmltcG9ydCB7IElSZXBvc2l0b3J5IH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IENyZWF0ZWRNb2RlbCwgUmVtb3ZlZE1vZGVsLCBVcGRhdGVkTW9kZWwgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFJlcG9zaXRvcnk8VCBleHRlbmRzIERvY3VtZW50PiBpbXBsZW1lbnRzIElSZXBvc2l0b3J5PFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtb2RlbDogTW9kZWw8VD4pIHt9XG5cbiAgYXN5bmMgaXNDb25uZWN0ZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubW9kZWwuZGIucmVhZHlTdGF0ZSAhPT0gMSlcbiAgICAgIHRocm93IG5ldyBBcGlFeGNlcHRpb24oYGRiICR7dGhpcy5tb2RlbC5kYi5uYW1lfSBkaXNjb25uZWN0ZWRgLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgJ0RhdGFiYXNlJyk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZG9jdW1lbnQ6IG9iamVjdCwgc2F2ZU9wdGlvbnM/OiBTYXZlT3B0aW9ucyk6IFByb21pc2U8Q3JlYXRlZE1vZGVsPiB7XG4gICAgY29uc3QgY3JlYXRlZEVudGl0eSA9IG5ldyB0aGlzLm1vZGVsKGRvY3VtZW50KTtcbiAgICBjb25zdCBzYXZlZFJlc3VsdCA9IGF3YWl0IGNyZWF0ZWRFbnRpdHkuc2F2ZShzYXZlT3B0aW9ucyk7XG5cbiAgICByZXR1cm4geyBpZDogc2F2ZWRSZXN1bHQuaWQsIGNyZWF0ZWQ6ICEhc2F2ZWRSZXN1bHQuaWQgfTtcbiAgfVxuXG4gIGFzeW5jIGZpbmQoZmlsdGVyOiBGaWx0ZXJRdWVyeTxUPiwgb3B0aW9ucz86IFF1ZXJ5T3B0aW9ucyk6IFByb21pc2U8VFtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwuZmluZChmaWx0ZXIsIHVuZGVmaW5lZCwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBmaW5kQnlJZChpZDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwuZmluZEJ5SWQoaWQpO1xuICB9XG5cbiAgYXN5bmMgZmluZE9uZShmaWx0ZXI6IEZpbHRlclF1ZXJ5PFQ+LCBvcHRpb25zPzogUXVlcnlPcHRpb25zKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwuZmluZE9uZShmaWx0ZXIsIHVuZGVmaW5lZCwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBmaW5kQWxsKCk6IFByb21pc2U8VFtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwuZmluZCgpO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlKGZpbHRlcjogRmlsdGVyUXVlcnk8VD4pOiBQcm9taXNlPFJlbW92ZWRNb2RlbD4ge1xuICAgIGNvbnN0IHsgZGVsZXRlZENvdW50IH0gPSBhd2FpdCB0aGlzLm1vZGVsLmRlbGV0ZU1hbnkoZmlsdGVyKTtcbiAgICByZXR1cm4geyBkZWxldGVkQ291bnQsIGRlbGV0ZWQ6ICEhZGVsZXRlZENvdW50IH07XG4gIH1cblxuICBhc3luYyB1cGRhdGVPbmUoXG4gICAgZmlsdGVyOiBGaWx0ZXJRdWVyeTxUPixcbiAgICB1cGRhdGVkOiBVcGRhdGVXaXRoQWdncmVnYXRpb25QaXBlbGluZSB8IFVwZGF0ZVF1ZXJ5PFQ+LFxuICAgIG9wdGlvbnM/OiAobW9uZ29kYi5VcGRhdGVPcHRpb25zICYgT21pdDxNb25nb29zZVF1ZXJ5T3B0aW9uczxUPiwgJ2xlYW4nPikgfCBudWxsLFxuICApOiBQcm9taXNlPFVwZGF0ZWRNb2RlbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLm1vZGVsLnVwZGF0ZU9uZShmaWx0ZXIsIHVwZGF0ZWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlTWFueShcbiAgICBmaWx0ZXI6IEZpbHRlclF1ZXJ5PFQ+LFxuICAgIHVwZGF0ZWQ6IFVwZGF0ZVdpdGhBZ2dyZWdhdGlvblBpcGVsaW5lIHwgVXBkYXRlUXVlcnk8VD4sXG4gICAgb3B0aW9ucz86IChtb25nb2RiLlVwZGF0ZU9wdGlvbnMgJiBPbWl0PE1vbmdvb3NlUXVlcnlPcHRpb25zPFQ+LCAnbGVhbic+KSB8IG51bGwsXG4gICk6IFByb21pc2U8VXBkYXRlZE1vZGVsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwudXBkYXRlTWFueShmaWx0ZXIsIHVwZGF0ZWQsIG9wdGlvbnMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGVPcHRpb25zIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5cbmltcG9ydCB7IElEYXRhQmFzZVNlcnZpY2UgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBDb25uZWN0aW9uTW9kZWwgfSBmcm9tICcuL3R5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFCYXNlU2VydmljZSBpbXBsZW1lbnRzIElEYXRhQmFzZVNlcnZpY2Uge1xuICBnZXREZWZhdWx0Q29ubmVjdGlvbjxUIGV4dGVuZHMgTW9uZ29vc2VNb2R1bGVPcHRpb25zID0gTW9uZ29vc2VNb2R1bGVPcHRpb25zPihjb25maWc6IENvbm5lY3Rpb25Nb2RlbCk6IFQge1xuICAgIHJldHVybiB7XG4gICAgICBhcHBOYW1lOiAnbW9ub3JlcG8nLFxuICAgICAgdXJpOiB0aGlzLmdldENvbm5lY3Rpb25TdHJpbmcoY29uZmlnKSxcbiAgICB9IGFzIFQ7XG4gIH1cblxuICBwcml2YXRlIGdldENvbm5lY3Rpb25TdHJpbmcoY29uZmlnOiBDb25uZWN0aW9uTW9kZWwpOiBzdHJpbmcge1xuICAgIHJldHVybiBgbW9uZ29kYjovLyR7Y29uZmlnLnVzZXJ9OiR7Y29uZmlnLnBhc3N9QCR7Y29uZmlnLmhvc3R9OiR7Y29uZmlnLnBvcnR9LyR7Y29uZmlnLmRiTmFtZX0/c2VydmVyU2VsZWN0aW9uVGltZW91dE1TPTUwMDAmY29ubmVjdFRpbWVvdXRNUz01MDAwJmF1dGhTb3VyY2U9YWRtaW4mYXV0aE1lY2hhbmlzbT1TQ1JBTS1TSEEtMjU2YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTGV2ZWxXaXRoU2lsZW50IH0gZnJvbSAncGlubyc7XG5pbXBvcnQgeyBIdHRwTG9nZ2VyIH0gZnJvbSAncGluby1odHRwJztcblxuaW1wb3J0IHsgRXJyb3JUeXBlLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4vdHlwZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJTG9nZ2VyU2VydmljZTxUIGV4dGVuZHMgSHR0cExvZ2dlciA9IEh0dHBMb2dnZXI+IHtcbiAgYWJzdHJhY3QgcGlubzogVDtcbiAgYWJzdHJhY3QgY29ubmVjdDxUTGV2ZWwgPSBMZXZlbFdpdGhTaWxlbnQ+KGxvZ0xldmVsPzogVExldmVsKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0QXBwbGljYXRpb24oYXBwOiBzdHJpbmcpOiB2b2lkO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhlIG1ldGhvZCBzaG91bGQgYmUgdXNlIG9ubHkgaW4gbWFpbi50cywgdGhpcyBsb2cgd29uJ3QgYmUgc2F2ZWQgaW4gZWxhc3RpYywgb25seSBzZG91dFxuICAgKi9cbiAgYWJzdHJhY3QgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XG4gIC8qKlxuICAgKiB0aGlzIGxvZyB3b24ndCBiZSBzYXZlZCBpbiBlbGFzdGljLCBvbmx5IHNkb3V0XG4gICAqL1xuICBhYnN0cmFjdCB0cmFjZSh7IG1lc3NhZ2UsIGNvbnRleHQsIG9iaiB9OiBNZXNzYWdlVHlwZSk6IHZvaWQ7XG4gIGFic3RyYWN0IGluZm8oeyBtZXNzYWdlLCBjb250ZXh0LCBvYmogfTogTWVzc2FnZVR5cGUpOiB2b2lkO1xuICBhYnN0cmFjdCB3YXJuKHsgbWVzc2FnZSwgY29udGV4dCwgb2JqIH06IE1lc3NhZ2VUeXBlKTogdm9pZDtcbiAgYWJzdHJhY3QgZXJyb3IoZXJyb3I6IEVycm9yVHlwZSwgbWVzc2FnZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGZhdGFsKGVycm9yOiBFcnJvclR5cGUsIG1lc3NhZ2U/OiBzdHJpbmcsIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBJU2VjcmV0c1NlcnZpY2UgfSBmcm9tICcuLi9zZWNyZXRzL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBJTG9nZ2VyU2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6ICh7IExPR19MRVZFTCwgRUxLX1VSTCB9OiBJU2VjcmV0c1NlcnZpY2UpID0+IHtcbiAgICAgICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlclNlcnZpY2UoRUxLX1VSTCk7XG4gICAgICAgIGxvZ2dlci5jb25uZWN0KExPR19MRVZFTCk7XG4gICAgICAgIHJldHVybiBsb2dnZXI7XG4gICAgICB9LFxuICAgICAgaW5qZWN0OiBbSVNlY3JldHNTZXJ2aWNlXSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbSUxvZ2dlclNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dnZXJNb2R1bGUge31cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdub2RlOmh0dHAnO1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnbm9kZTpzdHJlYW0nO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLCBTY29wZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGdyYXksIGdyZWVuLCBpc0NvbG9yU3VwcG9ydGVkLCByZWQsIHllbGxvdyB9IGZyb20gJ2NvbG9yZXR0ZSc7XG5pbXBvcnQgeyBQaW5vUmVxdWVzdENvbnZlcnRlciB9IGZyb20gJ2NvbnZlcnQtcGluby1yZXF1ZXN0LXRvLWN1cmwnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnbGlicy91dGlscyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IExldmVsV2l0aFNpbGVudCwgTG9nZ2VyLCBtdWx0aXN0cmVhbSwgcGlubyB9IGZyb20gJ3Bpbm8nO1xuLy8gaW1wb3J0IHBpbm9FbGFzdGljIGZyb20gJ3Bpbm8tZWxhc3RpY3NlYXJjaCc7XG5pbXBvcnQgeyBIdHRwTG9nZ2VyLCBPcHRpb25zLCBwaW5vSHR0cCB9IGZyb20gJ3Bpbm8taHR0cCc7XG5pbXBvcnQgcGlub1ByZXR0eSBmcm9tICdwaW5vLXByZXR0eSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgRXJyb3JUeXBlLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4vdHlwZSc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLHVuaWNvcm4vcHJlZmVyLW1vZHVsZVxuY29uc3QgcGlub0VsYXN0aWMgPSByZXF1aXJlKCdwaW5vLWVsYXN0aWNzZWFyY2gnKTtcblxuQEluamVjdGFibGUoeyBzY29wZTogU2NvcGUuUkVRVUVTVCB9KVxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2UgaW1wbGVtZW50cyBJTG9nZ2VyU2VydmljZSB7XG4gIHBpbm86IEh0dHBMb2dnZXI7XG4gIHByaXZhdGUgYXBwOiBzdHJpbmc7XG4gIHByaXZhdGUgc3RyZWFtVG9FbGFzdGljOiBUcmFuc2Zvcm07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGtVcmw6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gYG1vbm9yZXBvLWxvZ3MtJHt0aGlzLmdldERhdGVGb3JtYXQobmV3IERhdGUoKSwgJ3l5eXktTU0nKX1gO1xuXG4gICAgdGhpcy5zdHJlYW1Ub0VsYXN0aWMgPSBwaW5vRWxhc3RpYyh7XG4gICAgICBpbmRleCxcbiAgICAgIG5vZGU6IHRoaXMuZWxrVXJsLFxuICAgICAgZXNWZXJzaW9uOiA3LFxuICAgICAgZmx1c2hCeXRlczogMTAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbm5lY3Q8VCA9IExldmVsV2l0aFNpbGVudD4obG9nTGV2ZWw6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBwaW5vTG9nZ2VyID0gcGlubyhcbiAgICAgIHtcbiAgICAgICAgLy8gdXNlTGV2ZWxMYWJlbHM6IHRydWUsXG4gICAgICAgIGxldmVsOiBbbG9nTGV2ZWwsICd0cmFjZSddLmZpbmQoQm9vbGVhbikudG9TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgICBtdWx0aXN0cmVhbShbXG4gICAgICAgIHtcbiAgICAgICAgICBsZXZlbDogJ3RyYWNlJyxcbiAgICAgICAgICBzdHJlYW06IHBpbm9QcmV0dHkodGhpcy5nZXRQaW5vQ29uZmlnKCkpLFxuICAgICAgICB9LFxuICAgICAgICB7IGxldmVsOiAnaW5mbycsIHN0cmVhbTogdGhpcy5zdHJlYW1Ub0VsYXN0aWMgfSxcbiAgICAgIF0pLFxuICAgICk7XG5cbiAgICB0aGlzLnBpbm8gPSBwaW5vSHR0cCh0aGlzLmdldFBpbm9IdHRwQ29uZmlnKHBpbm9Mb2dnZXIpKTtcbiAgfVxuXG4gIHNldEFwcGxpY2F0aW9uKGFwcDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH1cblxuICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5waW5vLmxvZ2dlci50cmFjZShncmVlbihtZXNzYWdlKSk7XG4gIH1cblxuICB0cmFjZSh7IG1lc3NhZ2UsIGNvbnRleHQsIG9iaiA9IHt9IH06IE1lc3NhZ2VUeXBlKTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbihvYmosIHsgY29udGV4dCB9KTtcbiAgICB0aGlzLnBpbm8ubG9nZ2VyLnRyYWNlKFtvYmosIGdyYXkobWVzc2FnZSldLmZpbmQoQm9vbGVhbiksIGdyYXkobWVzc2FnZSkpO1xuICB9XG5cbiAgaW5mbyh7IG1lc3NhZ2UsIGNvbnRleHQsIG9iaiA9IHt9IH06IE1lc3NhZ2VUeXBlKTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbihvYmosIHsgY29udGV4dCB9KTtcbiAgICB0aGlzLnBpbm8ubG9nZ2VyLmluZm8oW29iaiwgZ3JlZW4obWVzc2FnZSldLmZpbmQoQm9vbGVhbiksIGdyZWVuKG1lc3NhZ2UpKTtcbiAgfVxuXG4gIHdhcm4oeyBtZXNzYWdlLCBjb250ZXh0LCBvYmogPSB7fSB9OiBNZXNzYWdlVHlwZSk6IHZvaWQge1xuICAgIE9iamVjdC5hc3NpZ24ob2JqLCB7IGNvbnRleHQgfSk7XG4gICAgdGhpcy5waW5vLmxvZ2dlci53YXJuKFtvYmosIHllbGxvdyhtZXNzYWdlKV0uZmluZChCb29sZWFuKSwgeWVsbG93KG1lc3NhZ2UpKTtcbiAgfVxuXG4gIGVycm9yKGVycm9yOiBFcnJvclR5cGUsIG1lc3NhZ2U/OiBzdHJpbmcsIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gdGhpcy5nZXRFcnJvclJlc3BvbnNlKGVycm9yKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID1cbiAgICAgIGVycm9yPy5uYW1lID09PSBBcGlFeGNlcHRpb24ubmFtZVxuICAgICAgICA/IHsgc3RhdHVzQ29kZTogZXJyb3JbJ3N0YXR1c0NvZGUnXSwgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfVxuICAgICAgICA6IGVycm9yUmVzcG9uc2U/LnZhbHVlKCk7XG5cbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgRXJyb3I6IEFwaUV4Y2VwdGlvbi5uYW1lLFxuICAgIH1bZXJyb3I/Lm5hbWVdO1xuXG4gICAgdGhpcy5waW5vLmxvZ2dlci5lcnJvcihcbiAgICAgIHtcbiAgICAgICAgLi4ucmVzcG9uc2UsXG4gICAgICAgIGNvbnRleHQ6IFtjb250ZXh0LCB0aGlzLmFwcF0uZmluZChCb29sZWFuKSxcbiAgICAgICAgdHlwZTogW3R5cGUsIGVycm9yPy5uYW1lXS5maW5kKEJvb2xlYW4pLFxuICAgICAgICB0cmFjZWlkOiB0aGlzLmdldFRyYWNlSWQoZXJyb3IpLFxuICAgICAgICB0aW1lc3RhbXA6IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpLFxuICAgICAgICBhcHBsaWNhdGlvbjogdGhpcy5hcHAsXG4gICAgICAgIHN0YWNrOiBlcnJvci5zdGFjayxcbiAgICAgIH0sXG4gICAgICByZWQobWVzc2FnZSksXG4gICAgKTtcbiAgfVxuXG4gIGZhdGFsKGVycm9yOiBFcnJvclR5cGUsIG1lc3NhZ2U/OiBzdHJpbmcsIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBpbm8ubG9nZ2VyLmZhdGFsKFxuICAgICAge1xuICAgICAgICAuLi4oZXJyb3IuZ2V0UmVzcG9uc2UoKSBhcyBvYmplY3QpLFxuICAgICAgICBjb250ZXh0OiBbY29udGV4dCwgdGhpcy5hcHBdLmZpbmQoQm9vbGVhbiksXG4gICAgICAgIHR5cGU6IGVycm9yLm5hbWUsXG4gICAgICAgIHRyYWNlaWQ6IHRoaXMuZ2V0VHJhY2VJZChlcnJvciksXG4gICAgICAgIHRpbWVzdGFtcDogdGhpcy5nZXREYXRlRm9ybWF0KCksXG4gICAgICAgIGFwcGxpY2F0aW9uOiB0aGlzLmFwcCxcbiAgICAgICAgc3RhY2s6IGVycm9yLnN0YWNrLFxuICAgICAgfSxcbiAgICAgIHJlZChtZXNzYWdlKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQaW5vQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcml6ZTogaXNDb2xvclN1cHBvcnRlZCxcbiAgICAgIGxldmVsRmlyc3Q6IHRydWUsXG4gICAgICBpZ25vcmU6ICdwaWQsaG9zdG5hbWUnLFxuICAgICAgcXVpZXRSZXFMb2dnZXI6IHRydWUsXG4gICAgICBtZXNzYWdlRm9ybWF0OiAobG9nOiB1bmtub3duLCBtZXNzYWdlS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGxvZ1tTdHJpbmcobWVzc2FnZUtleSldO1xuICAgICAgICBpZiAodGhpcy5hcHApIHtcbiAgICAgICAgICByZXR1cm4gYFske3RoaXMuYXBwfV0gJHttZXNzYWdlfWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH0sXG4gICAgICBjdXN0b21QcmV0dGlmaWVyczoge1xuICAgICAgICB0aW1lOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBbJHt0aGlzLmdldERhdGVGb3JtYXQoKX1dYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGlub0h0dHBDb25maWcocGlub0xvZ2dlcjogTG9nZ2VyKTogT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvZ2dlcjogcGlub0xvZ2dlcixcbiAgICAgIHF1aWV0UmVxTG9nZ2VyOiB0cnVlLFxuICAgICAgY3VzdG9tU3VjY2Vzc01lc3NhZ2U6IChyZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gYHJlcXVlc3QgJHtyZXMuc3RhdHVzQ29kZSA+PSA0MDAgPyByZWQoJ2VycnJvJykgOiBncmVlbignc3VjY2VzcycpfSB3aXRoIHN0YXR1cyBjb2RlOiAke3Jlcy5zdGF0dXNDb2RlfWA7XG4gICAgICB9LFxuICAgICAgY3VzdG9tRXJyb3JNZXNzYWdlOiAocmVxOiBJbmNvbWluZ01lc3NhZ2UsIHJlczogU2VydmVyUmVzcG9uc2UsIGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gYHJlcXVlc3QgJHtyZWQoZXJyb3IubmFtZSl9IHdpdGggc3RhdHVzIGNvZGU6ICR7cmVzLnN0YXR1c0NvZGV9IGA7XG4gICAgICB9LFxuICAgICAgZ2VuUmVxSWQ6IChyZXE6IEluY29taW5nTWVzc2FnZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVxLmhlYWRlcnMudHJhY2VpZDtcbiAgICAgIH0sXG4gICAgICBjdXN0b21BdHRyaWJ1dGVLZXlzOiB7XG4gICAgICAgIHJlcTogJ3JlcXVlc3QnLFxuICAgICAgICByZXM6ICdyZXNwb25zZScsXG4gICAgICAgIGVycjogJ2Vycm9yJyxcbiAgICAgICAgcmVzcG9uc2VUaW1lOiAndGltZVRha2VuJyxcbiAgICAgICAgcmVxSWQ6ICd0cmFjZWlkJyxcbiAgICAgIH0sXG4gICAgICBzZXJpYWxpemVyczoge1xuICAgICAgICBlcnI6ICgpID0+IGZhbHNlLFxuICAgICAgICByZXE6IChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG4gICAgICAgICAgICBjdXJsOiBQaW5vUmVxdWVzdENvbnZlcnRlci5nZXRDdXJsKHJlcXVlc3QpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHJlczogcGluby5zdGRTZXJpYWxpemVycy5yZXMsXG4gICAgICB9LFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGN1c3RvbVByb3BzOiAocmVxOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gcmVxLmNvbnRleHQ7XG5cbiAgICAgICAgY29uc3QgdHJhY2VpZCA9IFtyZXE/LmhlYWRlcnM/LnRyYWNlaWQsIHJlcS5pZF0uZmluZChCb29sZWFuKTtcblxuICAgICAgICBjb25zdCBwYXRoID0gYCR7cmVxLnByb3RvY29sfTovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3JlcS51cmx9YDtcblxuICAgICAgICB0aGlzLnBpbm8ubG9nZ2VyLnNldEJpbmRpbmdzKHtcbiAgICAgICAgICB0cmFjZWlkLFxuICAgICAgICAgIGFwcGxpY2F0aW9uOiB0aGlzLmFwcCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgdGltZXN0YW1wOiB0aGlzLmdldERhdGVGb3JtYXQoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFjZWlkLFxuICAgICAgICAgIGFwcGxpY2F0aW9uOiB0aGlzLmFwcCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgdGltZXN0YW1wOiB0aGlzLmdldERhdGVGb3JtYXQoKSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjdXN0b21Mb2dMZXZlbDogKHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlLCBlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKFtyZXMuc3RhdHVzQ29kZSA+PSA0MDAsIGVycm9yXS5zb21lKEJvb2xlYW4pKSB7XG4gICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoW3Jlcy5zdGF0dXNDb2RlID49IDMwMCwgcmVzLnN0YXR1c0NvZGUgPD0gNDAwXS5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgIHJldHVybiAnc2lsZW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwcml2YXRlIGdldEVycm9yUmVzcG9uc2UoZXJyb3I6IEVycm9yVHlwZSk6IGFueSB7XG4gICAgY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBlcnJvcj8uZ2V0UmVzcG9uc2UgPT09ICdmdW5jdGlvbic7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgY29uZGl0aW9uYWw6IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycsXG4gICAgICAgIHZhbHVlOiAoKSA9PiBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckV4Y2VwdGlvbihlcnJvcikuZ2V0UmVzcG9uc2UoKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmRpdGlvbmFsOiBpc0Z1bmN0aW9uICYmIHR5cGVvZiBlcnJvci5nZXRSZXNwb25zZSgpID09PSAnc3RyaW5nJyxcbiAgICAgICAgdmFsdWU6ICgpID0+XG4gICAgICAgICAgbmV3IEFwaUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGVycm9yLmdldFJlc3BvbnNlKCksXG4gICAgICAgICAgICBbZXJyb3IuZ2V0U3RhdHVzKCksIGVycm9yWydzdGF0dXMnXV0uZmluZChCb29sZWFuKSxcbiAgICAgICAgICAgIGVycm9yWydjb250ZXh0J10sXG4gICAgICAgICAgKS5nZXRSZXNwb25zZSgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uZGl0aW9uYWw6IGlzRnVuY3Rpb24gJiYgdHlwZW9mIGVycm9yLmdldFJlc3BvbnNlKCkgPT09ICdvYmplY3QnLFxuICAgICAgICB2YWx1ZTogKCkgPT4gZXJyb3I/LmdldFJlc3BvbnNlKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25kaXRpb25hbDogW2Vycm9yPy5uYW1lID09PSBFcnJvci5uYW1lLCBlcnJvcj8ubmFtZSA9PSBUeXBlRXJyb3IubmFtZV0uc29tZShCb29sZWFuKSxcbiAgICAgICAgdmFsdWU6ICgpID0+IG5ldyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKGVycm9yLm1lc3NhZ2UpLmdldFJlc3BvbnNlKCksXG4gICAgICB9LFxuICAgIF0uZmluZCgoYykgPT4gYy5jb25kaXRpb25hbCk7XG4gIH1cblxuICBwcml2YXRlIGdldERhdGVGb3JtYXQoZGF0ZSA9IG5ldyBEYXRlKCksIGZvcm1hdCA9ICdkZC9NTS95eXl5IEhIOm1tOnNzJyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIERhdGVUaW1lLmZyb21KU0RhdGUoZGF0ZSkuc2V0Wm9uZShwcm9jZXNzLmVudi5UWikudG9Gb3JtYXQoZm9ybWF0KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhY2VJZChlcnJvcik6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHJldHVybiB1dWlkdjQoKTtcbiAgICByZXR1cm4gW2Vycm9yLnRyYWNlaWQsIHRoaXMucGluby5sb2dnZXIuYmluZGluZ3MoKT8udHJhbmNlSWRdLmZpbmQoQm9vbGVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdsb2JhbCwgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBMb2dnZXJNb2R1bGUgfSBmcm9tICcuL2xvZ2dlci9tb2R1bGUnO1xuaW1wb3J0IHsgU2VjcmV0c01vZHVsZSB9IGZyb20gJy4vc2VjcmV0cy9tb2R1bGUnO1xuXG5AR2xvYmFsKClcbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbTG9nZ2VyTW9kdWxlLCBTZWNyZXRzTW9kdWxlXSxcbiAgZXhwb3J0czogW0xvZ2dlck1vZHVsZSwgU2VjcmV0c01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQXV0aEFQSUVudmlyb25tZW50LCBDYXRzQVBJRW52aXJvbm1lbnQgfSBmcm9tICcuL2VudW0nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSVNlY3JldHNTZXJ2aWNlIHtcbiAgRU5WOiBzdHJpbmc7XG4gIFJFRElTX1VSTDogc3RyaW5nO1xuXG4gIEVMS19VUkw6IHN0cmluZztcblxuICBNT05HT19FWFBSRVNTX1VSTDogc3RyaW5nO1xuICBKRUFHRVJfVVJMOiBzdHJpbmc7XG4gIFJFRElTX0NPTU1BTkRFUl9VUkw6IHN0cmluZztcbiAgS0lCQU5BX1VSTDogc3RyaW5nO1xuXG4gIExPR19MRVZFTDogc3RyaW5nO1xuXG4gIGRhdGFiYXNlOiB7XG4gICAgaG9zdDogc3RyaW5nO1xuICAgIHBvcnQ6IG51bWJlcjtcbiAgICB1c2VyOiBzdHJpbmc7XG4gICAgcGFzczogc3RyaW5nO1xuICB9O1xuXG4gIG1haW5BUEk6IHtcbiAgICBwb3J0OiBDYXRzQVBJRW52aXJvbm1lbnQgfCBudW1iZXI7XG4gICAgdXJsOiBDYXRzQVBJRW52aXJvbm1lbnQgfCBzdHJpbmc7XG4gIH07XG5cbiAgYXV0aEFQSToge1xuICAgIHBvcnQ6IEF1dGhBUElFbnZpcm9ubWVudCB8IG51bWJlcjtcbiAgICBqd3RUb2tlbjogQXV0aEFQSUVudmlyb25tZW50IHwgc3RyaW5nO1xuICAgIHVybDogQXV0aEFQSUVudmlyb25tZW50IHwgc3RyaW5nO1xuICB9O1xuXG4gIEdJVEhVQl9TQ1JBUF9BUEk6IHN0cmluZztcbn1cbiIsImV4cG9ydCBlbnVtIENhdHNBUElFbnZpcm9ubWVudCB7XG4gIFBPUlQgPSAnUE9SVF9DQVRTX0FQSScsXG4gIFVSTCA9ICdDQVRTX0FQSV9VUkwnLFxufVxuXG5leHBvcnQgZW51bSBBdXRoQVBJRW52aXJvbm1lbnQge1xuICBQT1JUID0gJ1BPUlRfQVVUSF9BUEknLFxuICBTRUNSRVRfSldUID0gJ1NFQ1JFVF9KV1QnLFxuICBVUkwgPSAnQVVUSF9BUElfVVJMJyxcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29uZmlnJztcblxuaW1wb3J0IHsgSVNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IFNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb25maWdNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBlbnZGaWxlUGF0aDogWycuZW52J10sXG4gICAgfSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IElTZWNyZXRzU2VydmljZSxcbiAgICAgIHVzZUNsYXNzOiBTZWNyZXRzU2VydmljZSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRzOiBbSVNlY3JldHNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VjcmV0c01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XG5pbXBvcnQgeyBMZXZlbFdpdGhTaWxlbnQgfSBmcm9tICdwaW5vJztcblxuaW1wb3J0IHsgSVNlY3JldHNTZXJ2aWNlIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IEF1dGhBUElFbnZpcm9ubWVudCwgQ2F0c0FQSUVudmlyb25tZW50IH0gZnJvbSAnLi9lbnVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlY3JldHNTZXJ2aWNlIGV4dGVuZHMgQ29uZmlnU2VydmljZSBpbXBsZW1lbnRzIElTZWNyZXRzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBFTEtfVVJMID0gdGhpcy5nZXQoJ0VMS19VUkwnKTtcblxuICBNT05HT19FWFBSRVNTX1VSTCA9IHRoaXMuZ2V0KCdNT05HT19FWFBSRVNTX1VSTCcpO1xuICBSRURJU19DT01NQU5ERVJfVVJMID0gdGhpcy5nZXQoJ1JFRElTX0NPTU1BTkRFUl9VUkwnKTtcbiAgSkVBR0VSX1VSTCA9IHRoaXMuZ2V0KCdKRUFHRVJfVVJMJyk7XG4gIEtJQkFOQV9VUkwgPSB0aGlzLmdldCgnS0lCQU5BX1VSTCcpO1xuXG4gIFJFRElTX1VSTCA9IHRoaXMuZ2V0KCdSRURJU19VUkwnKTtcblxuICBFTlYgPSB0aGlzLmdldCgnRU5WJyk7XG5cbiAgTE9HX0xFVkVMID0gdGhpcy5nZXQ8TGV2ZWxXaXRoU2lsZW50PignTE9HX0xFVkVMJyk7XG5cbiAgZGF0YWJhc2UgPSB7XG4gICAgaG9zdDogdGhpcy5nZXQoJ01PTkdPX0hPU1QnKSxcbiAgICBwb3J0OiB0aGlzLmdldDxudW1iZXI+KCdNT05HT19QT1JUJyksXG4gICAgdXNlcjogdGhpcy5nZXQoJ01PTkdPX0lOSVREQl9ST09UX1VTRVJOQU1FJyksXG4gICAgcGFzczogdGhpcy5nZXQoJ01PTkdPX0lOSVREQl9ST09UX1BBU1NXT1JEJyksXG4gIH07XG5cbiAgbWFpbkFQSSA9IHtcbiAgICBwb3J0OiB0aGlzLmdldDxudW1iZXI+KENhdHNBUElFbnZpcm9ubWVudC5QT1JUKSxcbiAgICB1cmw6IHRoaXMuZ2V0KENhdHNBUElFbnZpcm9ubWVudC5VUkwpLFxuICB9O1xuXG4gIGF1dGhBUEkgPSB7XG4gICAgcG9ydDogdGhpcy5nZXQ8bnVtYmVyPihBdXRoQVBJRW52aXJvbm1lbnQuUE9SVCksXG4gICAgand0VG9rZW46IHRoaXMuZ2V0KEF1dGhBUElFbnZpcm9ubWVudC5TRUNSRVRfSldUKSxcbiAgICB1cmw6IHRoaXMuZ2V0KEF1dGhBUElFbnZpcm9ubWVudC5VUkwpLFxuICB9O1xuXG4gIEdJVEhVQl9TQ1JBUF9BUEkgPSB0aGlzLmdldCgnR0lUSFVCX1NDUkFQX0FQSScpO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9kYXRhYmFzZS8vcmVwb3NpdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGFiYXNlL2FkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhYmFzZS9jb25uZWN0aW9uL2F1dGgnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhYmFzZS9jb25uZWN0aW9uL2NhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhYmFzZS90eXBlcyc7XG4vLyBOZWVlZWVlZXZlciBzZXJ2aWNlcyBoZXJlXG4iLCJleHBvcnQgY29uc3QgU1dBR0dFUl9BUElfUk9PVCA9ICdkb2NzJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RBRyA9ICdTd2FnZ2VyIERvY3VtZW50YXRpb24nO1xuIiwiaW1wb3J0IHsgQXBpUmVzcG9uc2VPcHRpb25zIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcblxuaW1wb3J0IHsgRXJyb3JNb2RlbCB9IGZyb20gJy4uL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBodHR0cFN0YXR1cyBmcm9tICcuLi9zdGF0aWMvaHR0dHAtc3RhdHVzLmpzb24nO1xuXG50eXBlIFN3YWdnZXJFcnJvciA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIHJvdXRlOiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmcgfCB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbnR5cGUgU3dhZ2dlclRleHQgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmcgfCB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbnR5cGUgU3dhZ2dlckpTT04gPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBqc29uOiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBTd2FnZ2VyID0ge1xuICBkZWZhdWx0UmVzcG9uc2VFcnJvcih7IHN0YXR1cywgcm91dGUsIG1lc3NhZ2UsIGRlc2NyaXB0aW9uIH06IFN3YWdnZXJFcnJvcik6IEFwaVJlc3BvbnNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjaGVtYToge1xuICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIGNvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgIHRyYWNlaWQ6ICc8dHJhY2VpZD4nLFxuICAgICAgICAgICAgbWVzc2FnZTogW21lc3NhZ2UsIGh0dHRwU3RhdHVzW1N0cmluZyhzdGF0dXMpXV0uZmluZChCb29sZWFuKSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogJzx0aW1lc3RhbXA+JyxcbiAgICAgICAgICAgIHBhdGg6IHJvdXRlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0gYXMgRXJyb3JNb2RlbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHN0YXR1cyxcbiAgICB9O1xuICB9LFxuXG4gIGRlZmF1bHRSZXNwb25zZVRleHQoeyBzdGF0dXMsIHRleHQsIGRlc2NyaXB0aW9uIH06IFN3YWdnZXJUZXh0KTogQXBpUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudDoge1xuICAgICAgICAndGV4dC9wbGFpbic6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIGV4YW1wbGU6IHRleHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHN0YXR1cyxcbiAgICB9O1xuICB9LFxuXG4gIGRlZmF1bHRSZXNwb25zZUpTT04oeyBzdGF0dXMsIGpzb24sIGRlc2NyaXB0aW9uIH06IFN3YWdnZXJKU09OKTogQXBpUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudDoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIGV4YW1wbGU6IGpzb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHN0YXR1cyxcbiAgICB9O1xuICB9LFxuXG4gIGRlZmF1bHRSZXF1ZXN0SlNPTihqc29uOiB1bmtub3duKTogQXBpUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NoZW1hOiB7XG4gICAgICAgIGV4YW1wbGU6IGpzb24sXG4gICAgICB9LFxuICAgIH07XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuZXhwb3J0IHR5cGUgRXJyb3JNb2RlbCA9IHtcbiAgZXJyb3I6IHtcbiAgICBjb2RlOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgdHJhY2VpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcbiAgICBwYXRoOiBzdHJpbmc7XG4gIH07XG59O1xuXG5leHBvcnQgY2xhc3MgQXBpRXhjZXB0aW9uIGV4dGVuZHMgSHR0cEV4Y2VwdGlvbiB7XG4gIGNvbnRleHQ6IHN0cmluZztcbiAgdHJhY2VpZDogc3RyaW5nO1xuICBzdGF0dXNDb2RlOiBudW1iZXI7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIGNvbmZpZz86IHVua25vd247XG4gIHVzZXI/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZXJyb3I6IHN0cmluZyB8IG9iamVjdCxcbiAgICBzdGF0dXM/OiBIdHRwU3RhdHVzLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3R4Pzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihlcnJvciwgW3N0YXR1cywgNTAwXS5maW5kKEJvb2xlYW4pKTtcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdXBlci5nZXRTdGF0dXMoKTtcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IGN0eDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEFyZ3VtZW50c0hvc3QsIENhdGNoLCBFeGNlcHRpb25GaWx0ZXIsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXInO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiwgRXJyb3JNb2RlbCB9IGZyb20gJy4uL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBlcnJvclN0YXR1cyBmcm9tICcuLi9zdGF0aWMvaHR0dHAtc3RhdHVzLmpzb24nO1xuXG5AQ2F0Y2goKVxuZXhwb3J0IGNsYXNzIEFwcEV4Y2VwdGlvbkZpbHRlciBpbXBsZW1lbnRzIEV4Y2VwdGlvbkZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyU2VydmljZTogSUxvZ2dlclNlcnZpY2UpIHt9XG5cbiAgY2F0Y2goZXhjZXB0aW9uOiBBcGlFeGNlcHRpb24sIGhvc3Q6IEFyZ3VtZW50c0hvc3QpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gaG9zdC5zd2l0Y2hUb0h0dHAoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGNvbnRleHQuZ2V0UmVzcG9uc2UoKTtcbiAgICBjb25zdCByZXF1ZXN0ID0gY29udGV4dC5nZXRSZXF1ZXN0PFJlcXVlc3Q+KCk7XG5cbiAgICBjb25zdCBzdGF0dXMgPVxuICAgICAgZXhjZXB0aW9uIGluc3RhbmNlb2YgSHR0cEV4Y2VwdGlvblxuICAgICAgICA/IGV4Y2VwdGlvbi5nZXRTdGF0dXMoKVxuICAgICAgICA6IFtleGNlcHRpb25bJ3N0YXR1cyddLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUl0uZmluZChCb29sZWFuKTtcblxuICAgIGV4Y2VwdGlvbi50cmFjZWlkID0gW2V4Y2VwdGlvbi50cmFjZWlkLCByZXF1ZXN0WydpZCddXS5maW5kKEJvb2xlYW4pO1xuXG4gICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmVycm9yKGV4Y2VwdGlvbiwgZXhjZXB0aW9uLm1lc3NhZ2UsIGV4Y2VwdGlvbi5jb250ZXh0KTtcblxuICAgIHJlc3BvbnNlLnN0YXR1cyhzdGF0dXMpLmpzb24oe1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgY29kZTogc3RhdHVzLFxuICAgICAgICB0cmFjZWlkOiBleGNlcHRpb24udHJhY2VpZCxcbiAgICAgICAgbWVzc2FnZTogW2Vycm9yU3RhdHVzW1N0cmluZyhzdGF0dXMpXSwgZXhjZXB0aW9uLm1lc3NhZ2VdLmZpbmQoQm9vbGVhbiksXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZVRpbWUuZnJvbUpTRGF0ZShuZXcgRGF0ZSgpKS5zZXRab25lKHByb2Nlc3MuZW52LlRaKS50b0Zvcm1hdCgnZGQvTU0veXl5eSBISDptbTpzcycpLFxuICAgICAgICBwYXRoOiByZXF1ZXN0LnVybCxcbiAgICAgIH0sXG4gICAgfSBhcyBFcnJvck1vZGVsKTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9leGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9yZXF1ZXN0JztcbiIsImltcG9ydCB7IENhbGxIYW5kbGVyLCBFeGVjdXRpb25Db250ZXh0LCBIdHRwU3RhdHVzLCBJbmplY3RhYmxlLCBOZXN0SW50ZXJjZXB0b3IgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBcGlSZXF1ZXN0IH0gZnJvbSAnbGlicy91dGlscy9yZXF1ZXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb25JbnRlcmNlcHRvciBpbXBsZW1lbnRzIE5lc3RJbnRlcmNlcHRvciB7XG4gIGludGVyY2VwdChleGVjdXRpb25Db250ZXh0OiBFeGVjdXRpb25Db250ZXh0LCBuZXh0OiBDYWxsSGFuZGxlcik6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiBuZXh0LmhhbmRsZSgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBlcnJvci5zdGF0dXMgPSBbZXJyb3Iuc3RhdHVzLCBlcnJvcj8ucmVzcG9uc2U/LnN0YXR1cywgNTAwXS5maW5kKEJvb2xlYW4pO1xuXG4gICAgICAgIGNvbnN0IGlzQ2xhc3NWYWxpZGF0b3JFcnJvciA9IFtcbiAgICAgICAgICBlcnJvci5zdGF0dXMgPT09IEh0dHBTdGF0dXMuUFJFQ09ORElUSU9OX0ZBSUxFRCxcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGVycm9yPy5yZXNwb25zZT8ubWVzc2FnZSksXG4gICAgICAgIF0uZXZlcnkoQm9vbGVhbik7XG5cbiAgICAgICAgaWYgKGlzQ2xhc3NWYWxpZGF0b3JFcnJvcikge1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvcj8ucmVzcG9uc2U/Lm1lc3NhZ2Uuam9pbignLCAnKTtcbiAgICAgICAgICBlcnJvci5yZXNwb25zZS5tZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcXVlc3Q6IEFwaVJlcXVlc3QgPSBleGVjdXRpb25Db250ZXh0LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcblxuICAgICAgICBjb25zdCBoZWFkZXJzID0gZXhlY3V0aW9uQ29udGV4dC5nZXRBcmdzKClbMF0/LmhlYWRlcnM7XG5cbiAgICAgICAgZXJyb3IudXNlciA9IGhlYWRlcnMudXNlcjtcblxuICAgICAgICB0aGlzLnNhbml0aXplRXh0ZXJuYWxFcnJvcihlcnJvcik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCcgJiYgIWVycm9yLnRyYWNlaWQpIHtcbiAgICAgICAgICBlcnJvci50cmFjZWlkID0gaGVhZGVycy50cmFjZWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGAke2V4ZWN1dGlvbkNvbnRleHQuZ2V0Q2xhc3MoKS5uYW1lfS8ke2V4ZWN1dGlvbkNvbnRleHQuZ2V0SGFuZGxlcigpLm5hbWV9YDtcblxuICAgICAgICBpZiAocmVxdWVzdD8udHJhY2luZykge1xuICAgICAgICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcocmVxdWVzdC50cmFjaW5nLnRhZ3MuRVJST1IsIHRydWUpO1xuICAgICAgICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcoJ21lc3NhZ2UnLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdzdGF0dXNDb2RlJywgZXJyb3Iuc3RhdHVzKTtcbiAgICAgICAgICByZXF1ZXN0LnRyYWNpbmcuYWRkVGFncyh7IHRyYWNlSWQ6IGVycm9yLnRyYWNlaWQgfSk7XG4gICAgICAgICAgcmVxdWVzdC50cmFjaW5nLmZpbmlzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXJyb3IuY29udGV4dCA9IGVycm9yLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwcml2YXRlIHNhbml0aXplRXh0ZXJuYWxFcnJvcihlcnJvcjogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBlcnJvcj8ucmVzcG9uc2UgPT09ICdvYmplY3QnICYmIGVycm9yPy5pc0F4aW9zRXJyb3IpIHtcbiAgICAgIGVycm9yWydnZXRSZXNwb25zZSddID0gKCkgPT4gKHsgLi4uZXJyb3I/LnJlc3BvbnNlPy5kYXRhPy5lcnJvciB9KTtcbiAgICAgIGVycm9yWydnZXRTdGF0dXMnXSA9ICgpID0+IFtlcnJvcj8ucmVzcG9uc2U/LmRhdGE/LmVycm9yPy5jb2RlLCBlcnJvcj8uc3RhdHVzXS5maW5kKEJvb2xlYW4pO1xuICAgICAgZXJyb3IubWVzc2FnZSA9IFtlcnJvcj8ucmVzcG9uc2U/LmRhdGE/LmVycm9yPy5tZXNzYWdlLCBlcnJvci5tZXNzYWdlXS5maW5kKEJvb2xlYW4pO1xuICAgICAgZXJyb3IudHJhY2VpZCA9IGVycm9yPy5yZXNwb25zZT8uZGF0YT8uZXJyb3I/LnRyYWNlaWQ7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDYWxsSGFuZGxlciwgRXhlY3V0aW9uQ29udGV4dCwgSW5qZWN0YWJsZSwgTmVzdEludGVyY2VwdG9yIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cExvZ2dlckludGVyY2VwdG9yIGltcGxlbWVudHMgTmVzdEludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsb2dnZXJTZXJ2aWNlOiBJTG9nZ2VyU2VydmljZSkge31cbiAgaW50ZXJjZXB0KGV4ZWN1dGlvbkNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsIG5leHQ6IENhbGxIYW5kbGVyKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgY29uc3QgY29udGV4dCA9IGAke2V4ZWN1dGlvbkNvbnRleHQuZ2V0Q2xhc3MoKS5uYW1lfS8ke2V4ZWN1dGlvbkNvbnRleHQuZ2V0SGFuZGxlcigpLm5hbWV9YDtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBleGVjdXRpb25Db250ZXh0LnN3aXRjaFRvSHR0cCgpLmdldFJlcXVlc3QoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGV4ZWN1dGlvbkNvbnRleHQuc3dpdGNoVG9IdHRwKCkuZ2V0UmVzcG9uc2UoKTtcblxuICAgIHJlcXVlc3RbJ2NvbnRleHQnXSA9IGNvbnRleHQ7XG5cbiAgICBpZiAoIXJlcXVlc3QuaGVhZGVycz8udHJhY2VpZCkge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzLnRyYWNlaWQgPSB1dWlkdjQoKTtcbiAgICAgIHJlcXVlc3QuaWQgPSByZXF1ZXN0LmhlYWRlcnMudHJhY2VpZDtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlclNlcnZpY2UucGlubyhyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbGxIYW5kbGVyLFxuICBFeGVjdXRpb25Db250ZXh0LFxuICBJbmplY3RhYmxlLFxuICBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uLFxuICBOZXN0SW50ZXJjZXB0b3IsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCBheGlvcywgeyBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBpbml0VHJhY2VyLCBKYWVnZXJUcmFjZXIsIFRyYWNpbmdDb25maWcsIFRyYWNpbmdPcHRpb25zIH0gZnJvbSAnamFlZ2VyLWNsaWVudCc7XG5pbXBvcnQgeyBJTG9nZ2VyU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvbG9nZ2VyL2FkYXB0ZXInO1xuaW1wb3J0IHsgVHJhY2luZ1R5cGUgfSBmcm9tICdsaWJzL3V0aWxzJztcbmltcG9ydCB7IEZPUk1BVF9IVFRQX0hFQURFUlMsIFNwYW4sIFNwYW5PcHRpb25zLCBUYWdzIH0gZnJvbSAnb3BlbnRyYWNpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGFwIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFjaW5nSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBOZXN0SW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIHRyYWNlcjogSmFlZ2VyVHJhY2VyO1xuICBwcml2YXRlIGFwcDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHsgYXBwLCB2ZXJzaW9uIH06IHsgYXBwOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZyB9LCBsb2dnZXI6IElMb2dnZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgICBjb25zdCBjb25maWc6IFRyYWNpbmdDb25maWcgPSB7XG4gICAgICBzZXJ2aWNlTmFtZTogYXBwLFxuICAgICAgc2FtcGxlcjoge1xuICAgICAgICB0eXBlOiAnY29uc3QnLFxuICAgICAgICBwYXJhbTogMSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IG9wdGlvbnM6IFRyYWNpbmdPcHRpb25zID0gdGhpcy5nZXRUcmFjaW5nTG9nZ2VyKGxvZ2dlcik7XG5cbiAgICBvcHRpb25zLnRhZ3MgPSB7XG4gICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgYXBwOiBhcHAsXG4gICAgfTtcblxuICAgIHRoaXMudHJhY2VyID0gaW5pdFRyYWNlcihjb25maWcsIG9wdGlvbnMpO1xuICB9XG5cbiAgaW50ZXJjZXB0KGV4ZWN1dGlvbkNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsIG5leHQ6IENhbGxIYW5kbGVyKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgY29uc3QgY29udGV4dCA9IGAke2V4ZWN1dGlvbkNvbnRleHQuZ2V0Q2xhc3MoKS5uYW1lfS8ke2V4ZWN1dGlvbkNvbnRleHQuZ2V0SGFuZGxlcigpLm5hbWV9YDtcbiAgICBjb25zdCByZXF1ZXN0ID0gZXhlY3V0aW9uQ29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzID0gZXhlY3V0aW9uQ29udGV4dC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXNwb25zZSgpO1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy50cmFjZXIuZXh0cmFjdChGT1JNQVRfSFRUUF9IRUFERVJTLCByZXF1ZXN0LmhlYWRlcnMpO1xuICAgIGNvbnN0IHBhcmVudE9iamVjdCA9IHBhcmVudCA/IHsgY2hpbGRPZjogcGFyZW50IH0gOiB7fTtcbiAgICBjb25zdCBzcGFuID0gdGhpcy50cmFjZXIuc3RhcnRTcGFuKHJlcXVlc3QuaGVhZGVycy5ob3N0ICsgcmVxdWVzdC5wYXRoLCBwYXJlbnRPYmplY3QpO1xuXG4gICAgY29uc3QgY3JlYXRlSmFlZ2VySW5zdGFuY2UgPSAoKTogVHJhY2luZ1R5cGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Bhbjogc3BhbixcbiAgICAgICAgdHJhY2VyOiB0aGlzLnRyYWNlcixcbiAgICAgICAgdGFnczogVGFncyxcbiAgICAgICAgYXhpb3M6IChvcHRpb25zOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICB0aGlzLnRyYWNlci5pbmplY3Qoc3BhbiwgRk9STUFUX0hUVFBfSEVBREVSUywgaGVhZGVycyk7XG4gICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0geyAuLi5vcHRpb25zLmhlYWRlcnMsIC4uLmhlYWRlcnMsIHRyYWNlaWQ6IHJlcXVlc3QuaWQgfTtcblxuICAgICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUob3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvZzogKGV2ZW50TmFtZSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICAgIHNwYW4ubG9nRXZlbnQoZXZlbnROYW1lLCBwYXlsb2FkKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VGFnOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHNwYW4uc2V0VGFnKGtleSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRUYWdzOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgc3Bhbi5hZGRUYWdzKG9iamVjdCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRyYWNpbmdUYWc6IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgc3Bhbi5zZXRUYWcoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmlzaDogKCkgPT4ge1xuICAgICAgICAgIHNwYW4uZmluaXNoKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVNwYW46IChuYW1lLCBwYXJlbnQ6IFNwYW4pID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRPYmplY3Q6IFNwYW5PcHRpb25zID0gcGFyZW50ID8geyBjaGlsZE9mOiBwYXJlbnQgfSA6IHsgY2hpbGRPZjogc3BhbiB9O1xuICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlci5zdGFydFNwYW4obmFtZSwgcGFyZW50T2JqZWN0KTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlcXVlc3QudHJhY2luZyA9IGNyZWF0ZUphZWdlckluc3RhbmNlKCk7XG5cbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdpcCcsIHJlcXVlc3QuaXApO1xuICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcoJ2FwcCcsIHRoaXMuYXBwKTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKFRhZ3MuSFRUUF9NRVRIT0QsIHJlcXVlc3QubWV0aG9kKTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdoZWFkZXJzJywgcmVxdWVzdC5oZWFkZXJzKTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdwYXRoJywgcmVxdWVzdC5wYXRoKTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdib2R5JywgcmVxdWVzdC5ib2R5KTtcbiAgICByZXF1ZXN0LnRyYWNpbmcuc2V0VGFnKCdxdWVyeScsIHJlcXVlc3QucXVlcnkpO1xuICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcoJ2NvbXBvbmVudCcsIGNvbnRleHQpO1xuXG4gICAgaWYgKHJlcXVlc3QuaWQpIHtcbiAgICAgIHJlcXVlc3QudHJhY2luZy5zZXRUYWcoJ3RyYWNlSWQnLCByZXF1ZXN0LmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgcmVxdWVzdC50cmFjaW5nLnNldFRhZyhUYWdzLkhUVFBfU1RBVFVTX0NPREUsIHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgICAgcmVxdWVzdC50cmFjaW5nLmZpbmlzaCgpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhY2luZ0xvZ2dlcihsb2dnZXI6IElMb2dnZXJTZXJ2aWNlKTogVHJhY2luZ09wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBsb2dnZXI6IHtcbiAgICAgICAgaW5mbzogKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UgYXMgdW5rbm93biBhcyBJbnRlcm5hbFNlcnZlckVycm9yRXhjZXB0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvbW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9zd2FnZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb2xvcmV0dGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29udmVydC1waW5vLXJlcXVlc3QtdG8tY3VybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqYWVnZXItY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsdXhvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvcGVudHJhY2luZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwaW5vXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBpbm8tZWxhc3RpY3NlYXJjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwaW5vLWh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGluby1wcmV0dHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBIdHRwU3RhdHVzLCBSZXF1ZXN0TWV0aG9kLCBWYWxpZGF0aW9uUGlwZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50QnVpbGRlciwgU3dhZ2dlck1vZHVsZSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBkZXNjcmlwdGlvbiwgbmFtZSwgdmVyc2lvbiB9IGZyb20gJ2FwcHMvYXV0aC1hcGkvcGFja2FnZS5qc29uJztcbmltcG9ydCB7IGJvbGQgfSBmcm9tICdjb2xvcmV0dGUnO1xuaW1wb3J0IHsgSUxvZ2dlclNlcnZpY2UgfSBmcm9tICdsaWJzL21vZHVsZXMvZ2xvYmFsL2xvZ2dlci9hZGFwdGVyJztcbmltcG9ydCB7IElTZWNyZXRzU2VydmljZSB9IGZyb20gJ2xpYnMvbW9kdWxlcy9nbG9iYWwvc2VjcmV0cy9hZGFwdGVyJztcbmltcG9ydCB7IERFRkFVTFRfVEFHLCBTV0FHR0VSX0FQSV9ST09UIH0gZnJvbSAnbGlicy91dGlscy9kb2N1bWVudGF0aW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBcHBFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdsaWJzL3V0aWxzL2ZpbHRlcnMvaHR0cC1leGNlcHRpb24uZmlsdGVyJztcbmltcG9ydCB7IEV4Y2VwdGlvbkludGVyY2VwdG9yIH0gZnJvbSAnbGlicy91dGlscy9pbnRlcmNlcHRvcnMvZXhjZXB0aW9uL2h0dHAtZXhjZXB0aW9uLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEh0dHBMb2dnZXJJbnRlcmNlcHRvciB9IGZyb20gJ2xpYnMvdXRpbHMvaW50ZXJjZXB0b3JzL2xvZ2dlci9odHRwLWxvZ2dlci5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBUcmFjaW5nSW50ZXJjZXB0b3IgfSBmcm9tICdsaWJzL3V0aWxzL2ludGVyY2VwdG9ycy9sb2dnZXIvaHR0cC10cmFjaW5nLmludGVyY2VwdG9yJztcblxuaW1wb3J0IHsgTWFpbk1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9tb2R1bGUnO1xuXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShNYWluTW9kdWxlLCB7XG4gICAgYnVmZmVyTG9nczogdHJ1ZSxcbiAgICBjb3JzOiB0cnVlLFxuICB9KTtcblxuICBhcHAudXNlR2xvYmFsUGlwZXMoXG4gICAgbmV3IFZhbGlkYXRpb25QaXBlKHtcbiAgICAgIGVycm9ySHR0cFN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuUFJFQ09ORElUSU9OX0ZBSUxFRCxcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdCBsb2dnZXJTZXJ2aWNlID0gYXBwLmdldChJTG9nZ2VyU2VydmljZSk7XG5cbiAgbG9nZ2VyU2VydmljZS5zZXRBcHBsaWNhdGlvbihuYW1lKTtcbiAgYXBwLnVzZUdsb2JhbEZpbHRlcnMobmV3IEFwcEV4Y2VwdGlvbkZpbHRlcihsb2dnZXJTZXJ2aWNlKSk7XG5cbiAgYXBwLnVzZUdsb2JhbEludGVyY2VwdG9ycyhcbiAgICBuZXcgRXhjZXB0aW9uSW50ZXJjZXB0b3IoKSxcbiAgICBuZXcgSHR0cExvZ2dlckludGVyY2VwdG9yKGxvZ2dlclNlcnZpY2UpLFxuICAgIG5ldyBUcmFjaW5nSW50ZXJjZXB0b3IoeyBhcHA6IG5hbWUsIHZlcnNpb24gfSwgbG9nZ2VyU2VydmljZSksXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGF1dGhBUEk6IHsgcG9ydDogUE9SVCwgdXJsIH0sXG4gICAgRU5WLFxuICAgIEtJQkFOQV9VUkwsXG4gICAgSkVBR0VSX1VSTCxcbiAgICBNT05HT19FWFBSRVNTX1VSTCxcbiAgICBSRURJU19DT01NQU5ERVJfVVJMLFxuICB9ID0gYXBwLmdldChJU2VjcmV0c1NlcnZpY2UpO1xuXG4gIGFwcC51c2VMb2dnZXIobG9nZ2VyU2VydmljZSk7XG5cbiAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBWYWxpZGF0aW9uUGlwZSh7IGVycm9ySHR0cFN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuUFJFQ09ORElUSU9OX0ZBSUxFRCB9KSk7XG5cbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpJywge1xuICAgIGV4Y2x1ZGU6IFt7IHBhdGg6ICdoZWFsdGgnLCBtZXRob2Q6IFJlcXVlc3RNZXRob2QuR0VUIH1dLFxuICB9KTtcblxuICBjb25zdCBjb25maWcgPSBuZXcgRG9jdW1lbnRCdWlsZGVyKClcbiAgICAuc2V0VGl0bGUobmFtZSlcbiAgICAuc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXG4gICAgLnNldFZlcnNpb24odmVyc2lvbilcbiAgICAuYWRkVGFnKERFRkFVTFRfVEFHKVxuICAgIC5idWlsZCgpO1xuXG4gIGNvbnN0IGRvY3VtZW50ID0gU3dhZ2dlck1vZHVsZS5jcmVhdGVEb2N1bWVudChhcHAsIGNvbmZpZyk7XG4gIFN3YWdnZXJNb2R1bGUuc2V0dXAoU1dBR0dFUl9BUElfUk9PVCwgYXBwLCBkb2N1bWVudCk7XG5cbiAgbG9nZ2VyU2VydmljZS5sb2coYPCfn6IgJHtuYW1lfSBsaXN0ZW5pbmcgYXQgJHtib2xkKFBPUlQpfSBvbiAke2JvbGQoRU5WPy50b1VwcGVyQ2FzZSgpKX0g8J+folxcbmApO1xuXG4gIGF3YWl0IGFwcC5saXN0ZW4oUE9SVCk7XG5cbiAgY29uc3Qgb3BlbkFwaVVSTCA9IGAke3VybH0vJHtTV0FHR0VSX0FQSV9ST09UfWA7XG5cbiAgbG9nZ2VyU2VydmljZS5sb2coYPCflLUgc3dhZ2dlciBsaXN0ZW5pbmcgYXQgJHtib2xkKG9wZW5BcGlVUkwpfWApO1xuICBsb2dnZXJTZXJ2aWNlLmxvZyhg8J+UtSBtb25nby1leHByZXNzIGxpc3RlbmluZyBhdCAke2JvbGQoTU9OR09fRVhQUkVTU19VUkwpfWApO1xuICBsb2dnZXJTZXJ2aWNlLmxvZyhg8J+UtSByZWRpcy1jb21tYW5kZXIgbGlzdGVuaW5nIGF0ICR7Ym9sZChSRURJU19DT01NQU5ERVJfVVJMKX1gKTtcbiAgbG9nZ2VyU2VydmljZS5sb2coYPCflLUga2liYW5hIGxpc3RlbmluZyBhdCAke2JvbGQoS0lCQU5BX1VSTCl9YCk7XG4gIGxvZ2dlclNlcnZpY2UubG9nKGDwn5S1IGplYWdlciBsaXN0ZW5pbmcgYXQgJHtib2xkKEpFQUdFUl9VUkwpfWApO1xufVxuYm9vdHN0cmFwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=