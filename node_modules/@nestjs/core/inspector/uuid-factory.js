"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidFactory = exports.UuidFactoryMode = void 0;
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const deterministic_uuid_registry_1 = require("./deterministic-uuid-registry");
var UuidFactoryMode;
(function (UuidFactoryMode) {
    UuidFactoryMode["Random"] = "random";
    UuidFactoryMode["Deterministic"] = "deterministic";
})(UuidFactoryMode || (exports.UuidFactoryMode = UuidFactoryMode = {}));
class UuidFactory {
    static set mode(value) {
        this._mode = value;
    }
    static get(key = '') {
        return this._mode === UuidFactoryMode.Deterministic
            ? deterministic_uuid_registry_1.DeterministicUuidRegistry.get(key)
            : (0, random_string_generator_util_1.randomStringGenerator)();
    }
}
exports.UuidFactory = UuidFactory;
UuidFactory._mode = UuidFactoryMode.Random;
