"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomStringGenerator = void 0;
const uid_1 = require("uid");
const randomStringGenerator = () => (0, uid_1.uid)(21);
exports.randomStringGenerator = randomStringGenerator;
