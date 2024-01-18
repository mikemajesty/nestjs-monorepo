"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAction = void 0;
const chalk = require("chalk");
const get_value_or_default_1 = require("../lib/compiler/helpers/get-value-or-default");
const schematics_1 = require("../lib/schematics");
const ui_1 = require("../lib/ui");
const load_configuration_1 = require("../lib/utils/load-configuration");
const project_utils_1 = require("../lib/utils/project-utils");
const abstract_action_1 = require("./abstract.action");
class GenerateAction extends abstract_action_1.AbstractAction {
    async handle(inputs, options) {
        await generateFiles(inputs.concat(options));
    }
}
exports.GenerateAction = GenerateAction;
const generateFiles = async (inputs) => {
    const configuration = await (0, load_configuration_1.loadConfiguration)();
    const collectionOption = inputs.find((option) => option.name === 'collection').value;
    const schematic = inputs.find((option) => option.name === 'schematic')
        .value;
    const appName = inputs.find((option) => option.name === 'project')
        .value;
    const spec = inputs.find((option) => option.name === 'spec');
    const flat = inputs.find((option) => option.name === 'flat');
    const specFileSuffix = inputs.find((option) => option.name === 'specFileSuffix');
    const collection = schematics_1.CollectionFactory.create(collectionOption || configuration.collection || schematics_1.Collection.NESTJS);
    const schematicOptions = mapSchematicOptions(inputs);
    schematicOptions.push(new schematics_1.SchematicOption('language', configuration.language));
    const configurationProjects = configuration.projects;
    let sourceRoot = appName
        ? (0, get_value_or_default_1.getValueOrDefault)(configuration, 'sourceRoot', appName)
        : configuration.sourceRoot;
    const specValue = spec.value;
    const flatValue = !!flat?.value;
    const specFileSuffixValue = specFileSuffix.value;
    const specOptions = spec.options;
    let generateSpec = (0, project_utils_1.shouldGenerateSpec)(configuration, schematic, appName, specValue, specOptions.passedAsInput);
    let generateFlat = (0, project_utils_1.shouldGenerateFlat)(configuration, appName, flatValue);
    let generateSpecFileSuffix = (0, project_utils_1.getSpecFileSuffix)(configuration, appName, specFileSuffixValue);
    // If you only add a `lib` we actually don't have monorepo: true BUT we do have "projects"
    // Ensure we don't run for new app/libs schematics
    if ((0, project_utils_1.shouldAskForProject)(schematic, configurationProjects, appName)) {
        const defaultLabel = ' [ Default ]';
        let defaultProjectName = configuration.sourceRoot + defaultLabel;
        for (const property in configurationProjects) {
            if (configurationProjects[property].sourceRoot === configuration.sourceRoot) {
                defaultProjectName = property + defaultLabel;
                break;
            }
        }
        const projects = (0, project_utils_1.moveDefaultProjectToStart)(configuration, defaultProjectName, defaultLabel);
        const answers = await (0, project_utils_1.askForProjectName)(ui_1.MESSAGES.PROJECT_SELECTION_QUESTION, projects);
        const project = answers.appName.replace(defaultLabel, '');
        if (project !== configuration.sourceRoot) {
            sourceRoot = configurationProjects[project].sourceRoot;
        }
        if (answers.appName !== defaultProjectName) {
            // Only overwrite if the appName is not the default- as it has already been loaded above
            generateSpec = (0, project_utils_1.shouldGenerateSpec)(configuration, schematic, answers.appName, specValue, specOptions.passedAsInput);
            generateFlat = (0, project_utils_1.shouldGenerateFlat)(configuration, answers.appNames, flatValue);
            generateSpecFileSuffix = (0, project_utils_1.getSpecFileSuffix)(configuration, appName, specFileSuffixValue);
        }
    }
    schematicOptions.push(new schematics_1.SchematicOption('sourceRoot', sourceRoot));
    schematicOptions.push(new schematics_1.SchematicOption('spec', generateSpec));
    schematicOptions.push(new schematics_1.SchematicOption('flat', generateFlat));
    schematicOptions.push(new schematics_1.SchematicOption('specFileSuffix', generateSpecFileSuffix));
    try {
        const schematicInput = inputs.find((input) => input.name === 'schematic');
        if (!schematicInput) {
            throw new Error('Unable to find a schematic for this configuration');
        }
        await collection.execute(schematicInput.value, schematicOptions);
    }
    catch (error) {
        if (error && error.message) {
            console.error(chalk.red(error.message));
        }
    }
};
const mapSchematicOptions = (inputs) => {
    const excludedInputNames = ['schematic', 'spec', 'flat', 'specFileSuffix'];
    const options = [];
    inputs.forEach((input) => {
        if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
            options.push(new schematics_1.SchematicOption(input.name, input.value));
        }
    });
    return options;
};
