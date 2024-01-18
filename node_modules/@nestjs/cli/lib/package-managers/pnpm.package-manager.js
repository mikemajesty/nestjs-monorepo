"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnpmPackageManager = void 0;
const runners_1 = require("../runners");
const abstract_package_manager_1 = require("./abstract.package-manager");
const package_manager_1 = require("./package-manager");
class PnpmPackageManager extends abstract_package_manager_1.AbstractPackageManager {
    constructor() {
        super(runners_1.RunnerFactory.create(runners_1.Runner.PNPM));
    }
    get name() {
        return package_manager_1.PackageManager.PNPM.toUpperCase();
    }
    // As of PNPM v5.3, all commands are shared with NPM v6.14.5. See: https://pnpm.js.org/en/pnpm-vs-npm
    get cli() {
        return {
            install: 'install --strict-peer-dependencies=false',
            add: 'install --strict-peer-dependencies=false',
            update: 'update',
            remove: 'uninstall',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--reporter=silent',
        };
    }
}
exports.PnpmPackageManager = PnpmPackageManager;
