"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeKillSync = void 0;
const child_process_1 = require("child_process");
function treeKillSync(pid, signal) {
    if (process.platform === 'win32') {
        (0, child_process_1.execSync)('taskkill /pid ' + pid + ' /T /F');
        return;
    }
    const childs = getAllChilds(pid);
    childs.forEach(function (pid) {
        killPid(pid, signal);
    });
    killPid(pid, signal);
    return;
}
exports.treeKillSync = treeKillSync;
function getAllPid() {
    const rows = (0, child_process_1.execSync)('ps -A -o pid,ppid')
        .toString()
        .trim()
        .split('\n')
        .slice(1);
    return rows
        .map(function (row) {
        const parts = row.match(/\s*(\d+)\s*(\d+)/);
        if (parts === null) {
            return null;
        }
        return {
            pid: Number(parts[1]),
            ppid: Number(parts[2]),
        };
    })
        .filter((input) => {
        return input != null;
    });
}
function getAllChilds(pid) {
    const allpid = getAllPid();
    const ppidHash = {};
    const result = [];
    allpid.forEach(function (item) {
        ppidHash[item.ppid] = ppidHash[item.ppid] || [];
        ppidHash[item.ppid].push(item.pid);
    });
    const find = function (pid) {
        ppidHash[pid] = ppidHash[pid] || [];
        ppidHash[pid].forEach(function (childPid) {
            result.push(childPid);
            find(childPid);
        });
    };
    find(pid);
    return result;
}
function killPid(pid, signal) {
    try {
        process.kill(pid, signal);
    }
    catch (err) {
        if (err.code !== 'ESRCH') {
            throw err;
        }
    }
}
