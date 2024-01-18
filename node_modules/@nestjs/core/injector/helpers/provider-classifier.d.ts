import { ClassProvider, FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
export declare function isClassProvider<T = any>(provider: Provider): provider is ClassProvider<T>;
export declare function isValueProvider<T = any>(provider: Provider): provider is ValueProvider<T>;
export declare function isFactoryProvider<T = any>(provider: Provider): provider is FactoryProvider<T>;
