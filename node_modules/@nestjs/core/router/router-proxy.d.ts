import { ExceptionsHandler } from '../exceptions/exceptions-handler';
export type RouterProxyCallback = <TRequest, TResponse>(req?: TRequest, res?: TResponse, next?: () => void) => void;
export declare class RouterProxy {
    createProxy(targetCallback: RouterProxyCallback, exceptionsHandler: ExceptionsHandler): <TRequest, TResponse>(req: TRequest, res: TResponse, next: () => void) => Promise<TResponse>;
    createExceptionLayerProxy(targetCallback: <TError, TRequest, TResponse>(err: TError, req: TRequest, res: TResponse, next: () => void) => void, exceptionsHandler: ExceptionsHandler): <TError, TRequest, TResponse>(err: TError, req: TRequest, res: TResponse, next: () => void) => Promise<TResponse>;
}
