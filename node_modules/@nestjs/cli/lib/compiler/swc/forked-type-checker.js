"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("../../ui");
const base_compiler_1 = require("../base-compiler");
const plugin_metadata_generator_1 = require("../plugins/plugin-metadata-generator");
const plugins_loader_1 = require("../plugins/plugins-loader");
const constants_1 = require("./constants");
const type_checker_host_1 = require("./type-checker-host");
const [tsConfigPath, appName, sourceRoot, plugins] = process.argv.slice(2);
class ForkedTypeChecker extends base_compiler_1.BaseCompiler {
    constructor() {
        super(...arguments);
        this.pluginMetadataGenerator = new plugin_metadata_generator_1.PluginMetadataGenerator();
        this.typeCheckerHost = new type_checker_host_1.TypeCheckerHost();
    }
    async run(configuration, tsConfigPath, appName, extras) {
        const { readonlyVisitors } = this.loadPlugins(configuration, tsConfigPath, appName);
        const outputDir = this.getPathToSource(configuration, tsConfigPath, appName);
        try {
            const onTypeCheckOrProgramInit = (program) => {
                if (readonlyVisitors.length > 0) {
                    console.log(constants_1.FOUND_NO_ISSUES_GENERATING_METADATA);
                    this.pluginMetadataGenerator.generate({
                        outputDir,
                        visitors: readonlyVisitors,
                        tsProgramRef: program,
                    });
                }
                else {
                    console.log(constants_1.FOUND_NO_ISSUES_METADATA_GENERATION_SKIPPED);
                }
            };
            this.typeCheckerHost.run(tsConfigPath, {
                watch: extras.watch,
                onTypeCheck: onTypeCheckOrProgramInit,
                onProgramInit: onTypeCheckOrProgramInit,
            });
        }
        catch (err) {
            console.log(ui_1.ERROR_PREFIX, err.message);
        }
    }
}
const pluginsLoader = new plugins_loader_1.PluginsLoader();
const forkedTypeChecker = new ForkedTypeChecker(pluginsLoader);
const applicationName = appName === 'undefined' ? '' : appName;
const options = {
    sourceRoot,
};
if (applicationName) {
    options.projects = {};
    options.projects[applicationName] = {
        compilerOptions: {
            plugins: JSON.parse(plugins),
        },
    };
}
else {
    options.compilerOptions = {
        plugins: JSON.parse(plugins),
    };
}
forkedTypeChecker.run(options, tsConfigPath, applicationName, { watch: true, typeCheck: true });
