import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import { IHttpService } from './adapter';

@Injectable()
export class HttpService implements IHttpService {
  http: Axios;
  config: AxiosRequestConfig;

  private defaultConfig: AxiosRequestConfig = {
    timeout: 2000,
  };

  setConfig(config?: AxiosRequestConfig): void {
    this.config = config;
  }

  constructor() {
    this.http = axios.create(this.config || this.defaultConfig);
  }
}
