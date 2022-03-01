import Axios, { AxiosRequestConfig } from 'axios';

export const api = async (config: AxiosRequestConfig<any>) => {
  const { data } = await Axios(config);
  return data;
};
