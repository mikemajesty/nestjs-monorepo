"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFilePipeBuilder = void 0;
const file_type_validator_1 = require("./file-type.validator");
const max_file_size_validator_1 = require("./max-file-size.validator");
const parse_file_pipe_1 = require("./parse-file.pipe");
/**
 * @publicApi
 */
class ParseFilePipeBuilder {
    constructor() {
        this.validators = [];
    }
    addMaxSizeValidator(options) {
        return this.addValidator(new max_file_size_validator_1.MaxFileSizeValidator(options));
    }
    addFileTypeValidator(options) {
        return this.addValidator(new file_type_validator_1.FileTypeValidator(options));
    }
    addValidator(validator) {
        this.validators.push(validator);
        return this;
    }
    build(additionalOptions) {
        const parseFilePipe = new parse_file_pipe_1.ParseFilePipe({
            ...additionalOptions,
            validators: this.validators,
        });
        this.validators = [];
        return parseFilePipe;
    }
}
exports.ParseFilePipeBuilder = ParseFilePipeBuilder;
