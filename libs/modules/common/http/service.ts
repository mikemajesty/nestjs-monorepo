import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import { IHttpService } from './adapter';

@Injectable()
export class HttpService implements IHttpService {
  http: Axios;

  private defaultConfig: AxiosRequestConfig = {
    timeout: 2000,
  };

  constructor(config?: AxiosRequestConfig) {
    this.http = axios.create(config || this.defaultConfig);
  }
}
