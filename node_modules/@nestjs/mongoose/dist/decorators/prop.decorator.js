"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = void 0;
const errors_1 = require("../errors");
const mongoose_constants_1 = require("../mongoose.constants");
const type_metadata_storage_1 = require("../storages/type-metadata.storage");
const TYPE_METADATA_KEY = 'design:type';
function Prop(options) {
    return (target, propertyKey) => {
        options = (options || {});
        const isRawDefinition = options[mongoose_constants_1.RAW_OBJECT_DEFINITION];
        if (!options.type && !Array.isArray(options) && !isRawDefinition) {
            const type = Reflect.getMetadata(TYPE_METADATA_KEY, target, propertyKey);
            if (type === Array) {
                options.type = [];
            }
            else if (type && type !== Object) {
                options.type = type;
            }
            else {
                throw new errors_1.CannotDetermineTypeError(target.constructor?.name, propertyKey);
            }
        }
        type_metadata_storage_1.TypeMetadataStorage.addPropertyMetadata({
            target: target.constructor,
            propertyKey: propertyKey,
            options: options,
        });
    };
}
exports.Prop = Prop;
