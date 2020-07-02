import { request } from './http';

export async function getGroupList(data:any) {
  const res: any = await request('/groupList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getGroupById(data:any) {
  const res: any = await request('/groupById', {
    method: "get",
    data
  });
  return res.data;
}