"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongooseAsyncProviders = exports.createMongooseProviders = void 0;
const mongoose_utils_1 = require("./common/mongoose.utils");
function createMongooseProviders(connectionName, options = []) {
    return options.reduce((providers, option) => [
        ...providers,
        ...(option.discriminators || []).map((d) => ({
            provide: (0, mongoose_utils_1.getModelToken)(d.name, connectionName),
            useFactory: (model) => model.discriminator(d.name, d.schema, d.value),
            inject: [(0, mongoose_utils_1.getModelToken)(option.name, connectionName)],
        })),
        {
            provide: (0, mongoose_utils_1.getModelToken)(option.name, connectionName),
            useFactory: (connection) => {
                const model = connection.models[option.name] ? connection.models[option.name] : connection.model(option.name, option.schema, option.collection);
                return model;
            },
            inject: [(0, mongoose_utils_1.getConnectionToken)(connectionName)],
        },
    ], []);
}
exports.createMongooseProviders = createMongooseProviders;
function createMongooseAsyncProviders(connectionName, modelFactories = []) {
    return modelFactories.reduce((providers, option) => {
        return [
            ...providers,
            {
                provide: (0, mongoose_utils_1.getModelToken)(option.name, connectionName),
                useFactory: async (connection, ...args) => {
                    const schema = await option.useFactory(...args);
                    const model = connection.model(option.name, schema, option.collection);
                    return model;
                },
                inject: [(0, mongoose_utils_1.getConnectionToken)(connectionName), ...(option.inject || [])],
            },
            ...(option.discriminators || []).map((d) => ({
                provide: (0, mongoose_utils_1.getModelToken)(d.name, connectionName),
                useFactory: (model) => model.discriminator(d.name, d.schema, d.value),
                inject: [(0, mongoose_utils_1.getModelToken)(option.name, connectionName)],
            })),
        ];
    }, []);
}
exports.createMongooseAsyncProviders = createMongooseAsyncProviders;
