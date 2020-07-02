import { request } from './http';

export async function getAccessionIdRapeList(data:any) {
  const res: any = await request('/accessionIdRapeList', {
    method: "get",
    data
  });
  return res.data;
}

export async function getRapeImgList(data:any) {
  const res: any = await request('/rapeImgList', {
    method: "get",
    data
  });
  return res.data;   
}