"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemReader = void 0;
const fs = require("fs");
const path = require("path");
class FileSystemReader {
    constructor(directory) {
        this.directory = directory;
    }
    list() {
        return fs.promises.readdir(this.directory);
    }
    read(name) {
        return fs.promises.readFile(path.join(this.directory, name), 'utf8');
    }
    async readAnyOf(filenames) {
        try {
            for (const file of filenames) {
                return await this.read(file);
            }
        }
        catch (err) {
            return filenames.length > 0
                ? await this.readAnyOf(filenames.slice(1, filenames.length))
                : undefined;
        }
    }
}
exports.FileSystemReader = FileSystemReader;
