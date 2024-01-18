import type { ParserServices } from '@typescript-eslint/experimental-utils';
export declare type RequiredParserServices = {
    [k in keyof ParserServices]: Exclude<ParserServices[k], undefined>;
};
export declare function isRequiredParserServices(services: ParserServices | undefined): services is RequiredParserServices;
