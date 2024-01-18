"use strict";
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
var MongooseCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseCoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose = require("mongoose");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const mongoose_utils_1 = require("./common/mongoose.utils");
const mongoose_constants_1 = require("./mongoose.constants");
let MongooseCoreModule = exports.MongooseCoreModule = MongooseCoreModule_1 = class MongooseCoreModule {
    constructor(connectionName, moduleRef) {
        this.connectionName = connectionName;
        this.moduleRef = moduleRef;
    }
    static forRoot(uri, options = {}) {
        const { retryAttempts, retryDelay, connectionName, connectionFactory, connectionErrorFactory, lazyConnection, ...mongooseOptions } = options;
        const mongooseConnectionFactory = connectionFactory || ((connection) => connection);
        const mongooseConnectionError = connectionErrorFactory || ((error) => error);
        const mongooseConnectionName = (0, mongoose_utils_1.getConnectionToken)(connectionName);
        const mongooseConnectionNameProvider = {
            provide: mongoose_constants_1.MONGOOSE_CONNECTION_NAME,
            useValue: mongooseConnectionName,
        };
        const connectionProvider = {
            provide: mongooseConnectionName,
            useFactory: async () => await (0, rxjs_1.lastValueFrom)((0, rxjs_1.defer)(async () => mongooseConnectionFactory(await this.createMongooseConnection(uri, mongooseOptions, lazyConnection), mongooseConnectionName)).pipe((0, mongoose_utils_1.handleRetry)(retryAttempts, retryDelay), (0, operators_1.catchError)((error) => {
                throw mongooseConnectionError(error);
            }))),
        };
        return {
            module: MongooseCoreModule_1,
            providers: [connectionProvider, mongooseConnectionNameProvider],
            exports: [connectionProvider],
        };
    }
    static forRootAsync(options) {
        const mongooseConnectionName = (0, mongoose_utils_1.getConnectionToken)(options.connectionName);
        const mongooseConnectionNameProvider = {
            provide: mongoose_constants_1.MONGOOSE_CONNECTION_NAME,
            useValue: mongooseConnectionName,
        };
        const connectionProvider = {
            provide: mongooseConnectionName,
            useFactory: async (mongooseModuleOptions) => {
                const { retryAttempts, retryDelay, uri, connectionFactory, connectionErrorFactory, lazyConnection, ...mongooseOptions } = mongooseModuleOptions;
                const mongooseConnectionFactory = connectionFactory || ((connection) => connection);
                const mongooseConnectionError = connectionErrorFactory || ((error) => error);
                return await (0, rxjs_1.lastValueFrom)((0, rxjs_1.defer)(async () => mongooseConnectionFactory(await this.createMongooseConnection(uri, mongooseOptions, lazyConnection), mongooseConnectionName)).pipe((0, mongoose_utils_1.handleRetry)(retryAttempts, retryDelay), (0, operators_1.catchError)((error) => {
                    throw mongooseConnectionError(error);
                })));
            },
            inject: [mongoose_constants_1.MONGOOSE_MODULE_OPTIONS],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: MongooseCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                connectionProvider,
                mongooseConnectionNameProvider,
            ],
            exports: [connectionProvider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: mongoose_constants_1.MONGOOSE_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: mongoose_constants_1.MONGOOSE_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createMongooseOptions(),
            inject,
        };
    }
    static async createMongooseConnection(uri, mongooseOptions, lazyConnection) {
        const connection = mongoose.createConnection(uri, mongooseOptions);
        if (lazyConnection) {
            return connection;
        }
        return connection.asPromise();
    }
    async onApplicationShutdown() {
        const connection = this.moduleRef.get(this.connectionName);
        connection && (await connection.close());
    }
};
exports.MongooseCoreModule = MongooseCoreModule = MongooseCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(mongoose_constants_1.MONGOOSE_CONNECTION_NAME)),
    __metadata("design:paramtypes", [String, core_1.ModuleRef])
], MongooseCoreModule);
