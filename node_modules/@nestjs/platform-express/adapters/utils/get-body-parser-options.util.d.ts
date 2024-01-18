import type { NestExpressBodyParserOptions } from '../../interfaces';
export declare function getBodyParserOptions<Options = NestExpressBodyParserOptions>(rawBody: boolean, options?: Omit<Options, 'verify'> | undefined): Options;
