import { Axios, AxiosRequestConfig } from 'axios';
export abstract class IHttpService {
  abstract server(config?: AxiosRequestConfig): Axios;
}
