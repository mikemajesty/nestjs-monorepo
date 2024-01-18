import { Observable } from 'rxjs';
export declare function getModelToken(model: string, connectionName?: string): string;
export declare function getConnectionToken(name?: string): string;
export declare function handleRetry(retryAttempts?: number, retryDelay?: number): <T>(source: Observable<T>) => Observable<T>;
