"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSelect = exports.generateInput = void 0;
const generateInput = (name, message) => {
    return (defaultAnswer) => ({
        type: 'input',
        name,
        message,
        default: defaultAnswer,
    });
};
exports.generateInput = generateInput;
const generateSelect = (name) => {
    return (message) => {
        return (choices) => ({
            type: 'list',
            name,
            message,
            choices,
        });
    };
};
exports.generateSelect = generateSelect;
