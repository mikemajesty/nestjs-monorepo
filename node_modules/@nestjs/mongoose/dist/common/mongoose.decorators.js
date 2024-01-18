"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectConnection = exports.InjectModel = void 0;
const common_1 = require("@nestjs/common");
const mongoose_utils_1 = require("./mongoose.utils");
const InjectModel = (model, connectionName) => (0, common_1.Inject)((0, mongoose_utils_1.getModelToken)(model, connectionName));
exports.InjectModel = InjectModel;
const InjectConnection = (name) => (0, common_1.Inject)((0, mongoose_utils_1.getConnectionToken)(name));
exports.InjectConnection = InjectConnection;
