/**
 * @file: description
 * @author: xinguangtai
 * @Date: 2020-07-02 17:45:07
 * @LastEditors: xinguangtai
 * @LastEditTime: 2020-07-04 23:33:34
 */
import { request } from './http';

export async function getNewsList(data:any) {
  const res: any = await request('/newsList', {
    method: "get",
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

export async function postNews(data:any) {
  const res: any = await request('/news', {
    method: "post",
    data
  });
  return res.data;
}