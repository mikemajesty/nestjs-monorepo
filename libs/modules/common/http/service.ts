import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import { IHttpService } from './adapter';

@Injectable()
export class HttpService implements IHttpService {
  instance(config?: AxiosRequestConfig): Axios {
    return axios.create(config || { timeout: 50000 });
  }
}
