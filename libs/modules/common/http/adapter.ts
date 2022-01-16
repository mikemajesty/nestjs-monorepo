import { Axios, AxiosRequestConfig } from 'axios';

export abstract class IHttpService {
  abstract setConfig(config?: AxiosRequestConfig): void;
  http: Axios;
}
