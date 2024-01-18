"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayManualRestartTip = exports.listenForManualRestart = void 0;
const chalk = require("chalk");
function listenForManualRestart(callback) {
    const stdinListener = (data) => {
        if (data.toString().trim() === 'rs') {
            process.stdin.removeListener('data', stdinListener);
            callback();
        }
    };
    process.stdin.on('data', stdinListener);
}
exports.listenForManualRestart = listenForManualRestart;
function displayManualRestartTip() {
    console.log(`To restart at any time, enter ${chalk.gray('rs')}.\n`);
}
exports.displayManualRestartTip = displayManualRestartTip;
