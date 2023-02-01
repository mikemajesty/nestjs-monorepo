import { Axios, AxiosRequestConfig } from 'axios';

export abstract class IHttpService<T = Axios> {
  abstract instance<TConfig = AxiosRequestConfig>(config?: TConfig): T;
}
