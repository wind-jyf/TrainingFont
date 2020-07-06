import axios from 'axios';
import { message } from 'antd';

interface IRequestOptions {
  method: 'get' | 'post' | 'put',
  data?: any,
  headers?: any
}

export const http = axios.create({
  timeout: 3000,
  baseURL: '/api/crophe',
  headers: {
    Accept: 'application/json'
  },
});

export function request(url: string, opts: IRequestOptions) {
  const { data = {}, ...extra } = opts;

  return http.request({
    url,
    method: opts.method || 'get',
    params: opts.method === 'get' || opts.method == null ? data : {},
    data: opts.method === 'post' || 'put' ? data : {},
    ...extra
  }).then(res => {
    let result;
    const { data } = res;
    if (data.code !== 0) {
      throw new Error(data.message);
    } else {
      result = data;
    }
    return result;
  }).catch((err) => {
    message.error(err.message);
    throw (err);
  });
}