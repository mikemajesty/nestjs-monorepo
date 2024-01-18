import { Answers } from 'inquirer';
import { Input } from '../../commands';
import { Configuration, ProjectConfiguration } from '../configuration';
export declare function shouldAskForProject(schematic: string, configurationProjects: {
    [key: string]: ProjectConfiguration;
}, appName: string): boolean;
export declare function shouldGenerateSpec(configuration: Required<Configuration>, schematic: string, appName: string, specValue: boolean, specPassedAsInput?: boolean): any;
export declare function shouldGenerateFlat(configuration: Required<Configuration>, appName: string, flatValue: boolean): boolean;
export declare function getSpecFileSuffix(configuration: Required<Configuration>, appName: string, specFileSuffixValue: string): string;
export declare function askForProjectName(promptQuestion: string, projects: string[]): Promise<Answers>;
export declare function moveDefaultProjectToStart(configuration: Configuration, defaultProjectName: string, defaultLabel: string): string[];
export declare function hasValidOptionFlag(queriedOptionName: string, options: Input[], queriedValue?: string | number | boolean): boolean;
