"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogLevelEnabled = void 0;
const LOG_LEVEL_VALUES = {
    verbose: 0,
    debug: 1,
    log: 2,
    warn: 3,
    error: 4,
    fatal: 5,
};
/**
 * Checks if target level is enabled.
 * @param targetLevel target level
 * @param logLevels array of enabled log levels
 */
function isLogLevelEnabled(targetLevel, logLevels) {
    if (!logLevels || (Array.isArray(logLevels) && logLevels?.length === 0)) {
        return false;
    }
    if (logLevels.includes(targetLevel)) {
        return true;
    }
    const highestLogLevelValue = logLevels
        .map(level => LOG_LEVEL_VALUES[level])
        .sort((a, b) => b - a)?.[0];
    const targetLevelValue = LOG_LEVEL_VALUES[targetLevel];
    return targetLevelValue >= highestLogLevelValue;
}
exports.isLogLevelEnabled = isLogLevelEnabled;
