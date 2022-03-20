import { Axios, AxiosRequestConfig } from 'axios';
export abstract class IHttpService {
  abstract instance(config?: AxiosRequestConfig): Axios;
}
