import { Input } from '../../../commands';
import { Configuration } from '../../configuration';
/**
 * Returns the builder to use for the given application.
 * @param configuration Configuration object.
 * @param cmdOptions Command line options.
 * @param appName Application name.
 * @returns The builder to use.
 */
export declare function getBuilder(configuration: Required<Configuration>, cmdOptions: Input[], appName: string): {
    type: "webpack";
    options?: import("../../configuration").WebpackBuilderOptions | undefined;
} | {
    type: "swc";
    options?: import("../../configuration").SwcBuilderOptions | undefined;
} | {
    type: "tsc";
    options?: import("../../configuration").TscBuilderOptions | undefined;
} | {
    type: import("../../configuration").BuilderVariant;
};
