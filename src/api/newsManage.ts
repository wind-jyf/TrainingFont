/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-04 23:06:24
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-04 23:26:29
 */
import { request } from './http';

export async function postNews(data:any) {
  const res: any = await request('/news', {
    method: "post",
    data
  });
  return res.data;
}

export async function getNewsById(data:any) {
  const res: any = await request('/newsListById', {
    method: "get",
    data
  });
  return res.data;
}