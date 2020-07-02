import { request } from './http';

export async function getProjectList(data:any) {
  const res: any = await request('/projectList', {
    method: "get",
    data
  });
  return res.data;
}