"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnpmRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class PnpmRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super('pnpm');
    }
}
exports.PnpmRunner = PnpmRunner;
