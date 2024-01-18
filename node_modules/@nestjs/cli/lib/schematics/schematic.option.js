"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicOption = void 0;
const formatting_1 = require("../utils/formatting");
class SchematicOption {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    get normalizedName() {
        return (0, formatting_1.normalizeToKebabOrSnakeCase)(this.name);
    }
    toCommandString() {
        if (typeof this.value === 'string') {
            if (this.name === 'name') {
                return `--${this.normalizedName}=${this.format()}`;
            }
            else if (this.name === 'version' || this.name === 'path') {
                return `--${this.normalizedName}=${this.value}`;
            }
            else {
                return `--${this.normalizedName}="${this.value}"`;
            }
        }
        else if (typeof this.value === 'boolean') {
            const str = this.normalizedName;
            return this.value ? `--${str}` : `--no-${str}`;
        }
        else {
            return `--${this.normalizedName}=${this.value}`;
        }
    }
    format() {
        return (0, formatting_1.normalizeToKebabOrSnakeCase)(this.value)
            .split('')
            .reduce((content, char) => {
            if (char === '(' || char === ')' || char === '[' || char === ']') {
                return `${content}\\${char}`;
            }
            return `${content}${char}`;
        }, '');
    }
}
exports.SchematicOption = SchematicOption;
