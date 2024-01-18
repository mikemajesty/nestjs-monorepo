import { Input } from '../../../commands';
import { Configuration } from '../../configuration';
/**
 * Returns the path to the tsc configuration file to use for the given application.
 * @param configuration Configuration object.
 * @param cmdOptions Command line options.
 * @param appName Application name.
 * @returns The path to the tsc configuration file to use.
 */
export declare function getTscConfigPath(configuration: Required<Configuration>, cmdOptions: Input[], appName: string): string;
