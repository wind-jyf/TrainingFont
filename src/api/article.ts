import { request } from './http';

export async function getArticleList(data:any) {
  const res: any = await request('/articleList', {
    method: "get",
    data
  });
  return res.data;
}