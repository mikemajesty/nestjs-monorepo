import { Provider, FactoryProvider } from '../../interfaces';
/**
 *
 * @param providers List of a module's providers
 * @param tokens Injection tokens needed for a useFactory function (usually the module's options' token)
 * @returns All the providers needed for the tokens' injection (searched recursively)
 */
export declare function getInjectionProviders(providers: Provider[], tokens: FactoryProvider['inject']): Provider[];
