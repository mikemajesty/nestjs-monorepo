"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplContext = void 0;
const common_1 = require("@nestjs/common");
const application_config_1 = require("../application-config");
const injector_1 = require("../injector");
const internal_core_module_1 = require("../injector/internal-core-module/internal-core-module");
const native_functions_1 = require("./native-functions");
class ReplContext {
    constructor(app, nativeFunctionsClassRefs) {
        this.app = app;
        this.logger = new common_1.Logger(ReplContext.name);
        this.debugRegistry = {};
        this.globalScope = Object.create(null);
        this.nativeFunctions = new Map();
        this.container = app.container; // Using `any` because `app.container` is not public.
        this.initializeContext();
        this.initializeNativeFunctions(nativeFunctionsClassRefs || []);
    }
    writeToStdout(text) {
        process.stdout.write(text);
    }
    initializeContext() {
        const modules = this.container.getModules();
        modules.forEach(moduleRef => {
            let moduleName = moduleRef.metatype.name;
            if (moduleName === internal_core_module_1.InternalCoreModule.name) {
                return;
            }
            if (this.globalScope[moduleName]) {
                moduleName += ` (${moduleRef.token})`;
            }
            this.introspectCollection(moduleRef, moduleName, 'providers');
            this.introspectCollection(moduleRef, moduleName, 'controllers');
            // For in REPL auto-complete functionality
            Object.defineProperty(this.globalScope, moduleName, {
                value: moduleRef.metatype,
                configurable: false,
                enumerable: true,
            });
        });
    }
    introspectCollection(moduleRef, moduleKey, collection) {
        const moduleDebugEntry = {};
        moduleRef[collection].forEach(({ token }) => {
            const stringifiedToken = this.stringifyToken(token);
            if (stringifiedToken === application_config_1.ApplicationConfig.name ||
                stringifiedToken === moduleRef.metatype.name) {
                return;
            }
            if (!this.globalScope[stringifiedToken]) {
                // For in REPL auto-complete functionality
                Object.defineProperty(this.globalScope, stringifiedToken, {
                    value: token,
                    configurable: false,
                    enumerable: true,
                });
            }
            if (stringifiedToken === injector_1.ModuleRef.name) {
                return;
            }
            moduleDebugEntry[stringifiedToken] = token;
        });
        this.debugRegistry[moduleKey] = {
            ...this.debugRegistry?.[moduleKey],
            [collection]: moduleDebugEntry,
        };
    }
    stringifyToken(token) {
        return typeof token !== 'string'
            ? typeof token === 'function'
                ? token.name
                : token?.toString()
            : `"${token}"`;
    }
    addNativeFunction(NativeFunctionRef) {
        const nativeFunction = new NativeFunctionRef(this);
        const nativeFunctions = [nativeFunction];
        this.nativeFunctions.set(nativeFunction.fnDefinition.name, nativeFunction);
        nativeFunction.fnDefinition.aliases?.forEach(aliasName => {
            const aliasNativeFunction = Object.create(nativeFunction);
            aliasNativeFunction.fnDefinition = {
                name: aliasName,
                description: aliasNativeFunction.fnDefinition.description,
                signature: aliasNativeFunction.fnDefinition.signature,
            };
            this.nativeFunctions.set(aliasName, aliasNativeFunction);
            nativeFunctions.push(aliasNativeFunction);
        });
        return nativeFunctions;
    }
    registerFunctionIntoGlobalScope(nativeFunction) {
        // Bind the method to REPL's context:
        this.globalScope[nativeFunction.fnDefinition.name] =
            nativeFunction.action.bind(nativeFunction);
        // Load the help trigger as a `help` getter on each native function:
        const functionBoundRef = this.globalScope[nativeFunction.fnDefinition.name];
        Object.defineProperty(functionBoundRef, 'help', {
            enumerable: false,
            configurable: false,
            get: () => 
            // Dynamically builds the help message as will unlikely to be called
            // several times.
            this.writeToStdout(nativeFunction.makeHelpMessage()),
        });
    }
    initializeNativeFunctions(nativeFunctionsClassRefs) {
        const builtInFunctionsClassRefs = [
            native_functions_1.HelpReplFn,
            native_functions_1.GetReplFn,
            native_functions_1.ResolveReplFn,
            native_functions_1.SelectReplFn,
            native_functions_1.DebugReplFn,
            native_functions_1.MethodsReplFn,
        ];
        builtInFunctionsClassRefs
            .concat(nativeFunctionsClassRefs)
            .forEach(NativeFunction => {
            const nativeFunctions = this.addNativeFunction(NativeFunction);
            nativeFunctions.forEach(nativeFunction => {
                this.registerFunctionIntoGlobalScope(nativeFunction);
            });
        });
    }
}
exports.ReplContext = ReplContext;
