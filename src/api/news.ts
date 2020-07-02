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